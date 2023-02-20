package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"

	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/pgdialect"
	"github.com/uptrace/bun/driver/pgdriver"
	"github.com/uptrace/bun/extra/bundebug"
	// srv "server-go/fileserver"
)

const (
	host     = "52.207.198.14"
	port     = 5432
	user     = "ubuntu"
	password = "birdhouse"
	dbname   = "stocks"
)

func main() {
	fs := http.FileServer(http.Dir("public"))
	port := ":3001"
	http.Handle("/", fs)                     // serves static files
	http.HandleFunc("/getUser", userHandler) // if route is /getUser, register  this handleFunc

	log.Print("Listening on " + port + "...")
	err := http.ListenAndServe(port, nil)
	if err != nil {
		log.Fatal(err)
	}
}

type DBUser struct {
	Index    int64  `json:"index"`
	User_id  int64  `json:"user_id"`
	Nickname string `json:"nickname"`
}

func checkAuthentication(uname string) (map[string]any, error) {
	ctx := context.Background()
	dsn := "postgres://ubuntu:birdhouse@52.207.198.14:5432/stocks?sslmode=disable"
	sqldb := sql.OpenDB(pgdriver.NewConnector(pgdriver.WithDSN(dsn)))
	db := bun.NewDB(sqldb, pgdialect.New())
	db.AddQueryHook(bundebug.NewQueryHook(
		bundebug.WithVerbose(true),
		bundebug.FromEnv("BUNDEBUG"),
	))

	rows, err := db.QueryContext(ctx, "SELECT * FROM users WHERE nickname=?", uname)
	cols, _ := rows.Columns()
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	// userObj := make(map[string]any)
	// nicknames := make([]string, 0)
	m := make(map[string]interface{})
	for rows.Next() {
		// var index int
		// var user_id int
		// var nickname string
		// if err := rows.Scan(&index, &user_id, &nickname); err != nil {
		// 	log.Fatal(err)
		// }
		// nicknames = append(nicknames, nickname)
		// userObj["index"] = index
		// userObj["user_id"] = user_id
		// userObj["nickname"] = nickname

		// create a slice of interfaces to represent each column
		// and a second slice to contain pointers to each item in the columns slice
		columns := make([]interface{}, len(cols))
		columnPointers := make([]interface{}, len(cols))
		for i, _ := range columns {
			columnPointers[i] = &columns[i]
		}

		// scan the result into the column pointers
		if err := rows.Scan(columnPointers...); err != nil {
			return nil, err
		}

		// create a map and retrieve the value for each column from the pointers slice
		// storing it in the map with the name of the column as the key

		for i, colName := range cols {
			val := columnPointers[i].(*interface{})
			m[colName] = *val
		}
	}
	if m["index"] == nil || m["user_id"] == nil || m["nickname"] == nil {
		var insert string = `insert into "users" (nickname) values($1) returning user_id`
		_, err = db.Exec(insert, uname)
		if err != nil {
			panic(err)
		}
	}
	return m, nil
	// users := make([]DBUser, 0)
	// return &users, nil
	// err := db.NewRaw(
	// 	"SELECT * FROM users where nickname=?", uname,
	// 	bun.Ident("stocks"),
	// ).Scan(ctx, &users)
	// if err != nil {
	// 	return nil, err
	// } else {
	// 	return &users, nil
	// }

}

type User struct {
	User Details `json:"user"`
}

type Details struct {
	Name       Name       `json:"name"`
	Nickname   Nickname   `json:"nickname"`
	Picture    Picture    `json:"picture"`
	Sub        Sub        `json:"sub"`
	Updated_at Updated_at `json:"updated_at"`
}

type Name string
type Nickname string
type Picture string
type Sub string
type Updated_at string

func userHandler(w http.ResponseWriter, r *http.Request) {
	// select user from db
	// if no entry in db, insert user into db
	if r.URL.Path != "/getUser" {
		http.Error(w, "404 not found", http.StatusNotFound)
		return
	}
	if r.Method != "POST" {
		http.Error(w, "method is not supported", http.StatusNotFound)
		return
	}

	var user User
	var unmarshalErr *json.UnmarshalTypeError
	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&user)
	if err != nil {
		if errors.As(err, &unmarshalErr) {
			http.Error(w, "Bad Request. Wrong Type provided for field "+unmarshalErr.Field, http.StatusBadRequest)
		} else {
			http.Error(w, "Bad Request "+err.Error(), http.StatusBadRequest)
		}
		return
	}

	nickname := user.User.Nickname
	resp, err := checkAuthentication(string(nickname))
	if err != nil {
		panic(err)
	}

	fmt.Println("database response:", resp)

	json.NewEncoder(w).Encode(resp)
}
