package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"

	ds "go-server/lib"

	"github.com/spf13/viper"
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
	http.HandleFunc("/validTickers", trieHandler)

	log.Print("Listening on " + port + "...")
	err := http.ListenAndServe(port, nil)
	if err != nil {
		log.Fatal(err)
	}
}

func viperEnvKey(key string) string {
	// setConfigFile explicitly defines path, name, and extension of config file
	// viper will use this
	viper.SetConfigFile(".env")

	err := viper.ReadInConfig()

	if err != nil {
		log.Fatalf("Error reading config file %s", err)

		// viper.Get() returns an empty interface
	}
	value, ok := viper.Get(key).(string)
	if !ok {
		log.Fatalf("invalid type assertion")
	}
	log.Print("value:", value)
	return value
}

type DBUser struct {
	Index    int64  `json:"index"`
	User_id  int64  `json:"user_id"`
	Nickname string `json:"nickname"`
}

func dbConnect() *bun.DB {
	dsn := viperEnvKey("URI")
	sqldb := sql.OpenDB(pgdriver.NewConnector(pgdriver.WithDSN(dsn)))
	db := bun.NewDB(sqldb, pgdialect.New())
	db.AddQueryHook(bundebug.NewQueryHook(
		bundebug.WithVerbose(true),
		bundebug.FromEnv("BUNDEBUG"),
	))
	return db
}

func checkAuthentication(uname string) (map[string]any, error) {
	db := dbConnect()

	ctx := context.Background()
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
		var insert string = `insert into "users" (nickname) values(?) returning user_id`
		_, err = db.Exec(insert, uname)
		if err != nil {
			panic(err)
		}
	}
	return m, nil
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
	// nickname := "abcd"
	resp, err := checkAuthentication(string(nickname))
	if err != nil {
		panic(err)
	}

	fmt.Println("database response:", resp)

	json.NewEncoder(w).Encode(resp)
}

func trieHandler(w http.ResponseWriter, r *http.Request) {
	query := `select i.ticker from information i where i.isdelisted='N'`
	db := dbConnect()
	ctx := context.Background()
	rows, err := db.QueryContext(ctx, query)
	// cols, _ := rows.Columns()
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	var tickers []string
	for rows.Next() {
		var ticker string
		err := rows.Scan(&ticker)
		if err != nil {
			log.Fatal(err)
		}
		// log.Print(id, ticker)
		tickers = append(tickers, ticker)
	}
	// fmt.Println(tickers)
	trie := ds.CreateTrie()
	// fmt.Println("trie:", &trie.Root)
	// // root := &trie.root
	for t := range tickers {
		// fmt.Println(string(tickers[t]))
		// fmt.Println(trie)
		// trie.Insert(string(tickers[t]), root)
		trie.Root = trie.Insert(string(tickers[t]), &trie.Root)
		// trie.root = trie.Insert("help", &trie.root)
	}

	// fmt.Println("trie:", &trie.Root)

	json.NewEncoder(w).Encode(trie)
}
