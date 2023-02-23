package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"

	ds "go-server/lib"

	"github.com/gorilla/mux"
	"github.com/spf13/viper"
	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/pgdialect"
	"github.com/uptrace/bun/driver/pgdriver"
	"github.com/uptrace/bun/extra/bundebug"
	// srv "server-go/fileserver"
)

type spaHandler struct {
	staticPath string
	indexPath  string
}

func (h spaHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// get the absolute path to prevent directory traversal
	path, err := filepath.Abs(r.URL.Path)
	if err != nil {
		// if we failed to get the absolute path respond with a 400 bad request
		// and stop
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// prepend the path with the path to the static directory
	path = filepath.Join(h.staticPath, path)

	// check whether a file exists at the given path
	_, err = os.Stat(path)
	if os.IsNotExist(err) {
		// file does not exist, serve index.html
		http.ServeFile(w, r, filepath.Join(h.staticPath, h.indexPath))
		return
	} else if err != nil {
		// if we got an error (that wasn't that the file doesn't exist) stating the
		// file, return a 500 internal server error and stop
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// otherwise, use http.FileServer to serve the static dir
	http.FileServer(http.Dir(h.staticPath)).ServeHTTP(w, r)
}

func main() {
	router := mux.NewRouter()
	// fs := http.FileServer(http.Dir("public"))
	// port := ":3001"

	// router.HandleFunc("/", fs)
	s := http.StripPrefix("/", http.FileServer(http.Dir("public")))
	router.HandleFunc("/getUser", userHandler)
	router.HandleFunc("/validTickers", trieHandler)
	router.HandleFunc("/tickers", tickersHandler)
	router.HandleFunc("/ticker/{ticker}", TickerInfoHandler)
	router.HandleFunc("/price/{ticker}", PriceHandler)
	router.HandleFunc("/chart/{ticker}", ChartHandler)
	router.HandleFunc("/quote/{ticker}", QuoteHandler)
	// spa := spaHandler{staticPath: "public", indexPath: "index.html"}
	// router.PathPrefix("/").Handler(spa)

	http.Handle("/", router)
	router.PathPrefix("/").Handler(s)
	// srv := &http.Server{
	// 	Handler:      router,
	// 	Addr:         "127.0.0.1:3001",
	// 	WriteTimeout: 15 * time.Second,
	// 	ReadTimeout:  15 * time.Second,
	// }

	log.Fatal(http.ListenAndServe(":3001", nil))
	// http.Handle("/", fs) // serves static files

	// http.HandleFunc("/getUser", userHandler) // if route is /getUser, register  this handleFunc
	// http.HandleFunc("/validTickers", trieHandler)
	// http.HandleFunc("/tickers", tickersHandler)
	// http.HandleFunc("/ticker/", TickerInfoHandler)

	// log.Print("Listening on " + port + "...")
	// err := http.ListenAndServe(port, nil)
	// if err != nil {
	// 	log.Fatal(err)
	// }
}

func printRequestUrl(r *http.Request) {
	log.Print(r.URL)
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
	printRequestUrl(r)
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

	// fmt.Println("database response:", resp)

	json.NewEncoder(w).Encode(resp)
}

func trieHandler(w http.ResponseWriter, r *http.Request) {
	printRequestUrl(r)
	query := `select i.ticker from information i where i.isdelisted='N'`
	db := dbConnect()
	ctx := context.Background()
	rows, err := db.QueryContext(ctx, query)
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
		tickers = append(tickers, ticker)
	}
	trie := ds.CreateTrie()

	for t := range tickers {
		trie.Root = trie.Insert(string(tickers[t]), &trie.Root)
	}

	json.NewEncoder(w).Encode(trie)
}

type VerifiedUser struct {
	User int `json:"user"`
}

type Tickers struct {
	Id      int    `json:"id"`
	Date    string `json:"date"`
	Ticker  string `json:"ticker"`
	User_id int    `json:"ticker"`
}

func tickersHandler(w http.ResponseWriter, r *http.Request) {
	printRequestUrl(r)
	if r.URL.Path != "/tickers" {
		http.Error(w, "404 not found", http.StatusNotFound)
		return
	}
	if r.Method != "POST" {
		http.Error(w, "method is not supported", http.StatusNotFound)
		return
	}

	var verifiedUser VerifiedUser
	var unmarshalErr *json.UnmarshalTypeError
	decoder := json.NewDecoder(r.Body)
	// fmt.Println(r.Body)
	decoder.DisallowUnknownFields()
	// fmt.Println(decoder.Decode(&verifiedUser))
	err := decoder.Decode(&verifiedUser)
	if err != nil {
		if errors.As(err, &unmarshalErr) {
			http.Error(w, "Bad Request. Wrong Type provided for field "+unmarshalErr.Field, http.StatusBadRequest)
		} else {
			http.Error(w, "Bad Request "+err.Error(), http.StatusBadRequest)
		}
		return
	}
	db := dbConnect()
	query := `select * from chosen c where c.user_id=? order by c.ticker asc`
	ctx := context.Background()
	rows, err := db.QueryContext(ctx, query, verifiedUser.User)
	cols, _ := rows.Columns()
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	var tickers []map[string]interface{}
	m := make(map[string]interface{})
	for rows.Next() {
		columns := make([]interface{}, len(cols))
		columnPointers := make([]interface{}, len(cols))
		for i, _ := range columns {
			columnPointers[i] = &columns[i]
		}

		// scan the result into the column pointers
		if err := rows.Scan(columnPointers...); err != nil {
			return
		}

		// create a map and retrieve the value for each column from the pointers slice
		// storing it in the map with the name of the column as the key

		for i, colName := range cols {
			val := columnPointers[i].(*interface{})
			m[colName] = *val
		}
		tickers = append(tickers, m)
	}

	json.NewEncoder(w).Encode(tickers)
}

type TickerInfo struct {
	Ticker         string `json:"ticker"`
	Name           string `json:"name"`
	Sector         string `json:"sector"`
	Industry       string `json:"industry"`
	Scalemarketcap string `json:"scalemarketcap"`
	Scalerevenue   string `json:"scalerevenue"`
}

func TickerInfoHandler(w http.ResponseWriter, r *http.Request) {
	printRequestUrl(r)
	if r.Method != "GET" {
		http.Error(w, "method is not supported", http.StatusNotFound)
		return
	}

	ticker := strings.Split(r.URL.Path, "/")[2]
	fmt.Println("ticker request:", ticker)
	db := dbConnect()
	ctx := context.Background()
	query := `
		SELECT c.ticker, i.name, i.sector, i.industry, i.scalemarketcap, i.scalerevenue
		FROM chosen c, information i
		WHERE c.ticker = ? AND c.ticker = i.ticker
		ORDER BY c.ticker asc
	`
	rows, err := db.QueryContext(ctx, query, ticker)
	cols, _ := rows.Columns()
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	m := make(map[string]interface{})
	for rows.Next() {
		columns := make([]interface{}, len(cols))
		columnPointers := make([]interface{}, len(cols))
		for i, _ := range columns {
			columnPointers[i] = &columns[i]
		}

		// scan the result into the column pointers
		if err := rows.Scan(columnPointers...); err != nil {
			return
		}

		// create a map and retrieve the value for each column from the pointers slice
		// storing it in the map with the name of the column as the key

		for i, colName := range cols {
			val := columnPointers[i].(*interface{})
			m[colName] = *val
		}
	}
	json.NewEncoder(w).Encode(m)
}

func PriceHandler(w http.ResponseWriter, r *http.Request) {
	printRequestUrl(r)
	ticker := strings.Split(r.URL.Path, "/")[2]
	iex := viperEnvKey("IEX")
	url := "https://cloud.iexapis.com/stable/stock/" + ticker + "/price?token=" + iex
	resp, err := http.Get(url)
	if err != nil {
		log.Fatal(err)
	}
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(string(body))
	price, err := strconv.ParseFloat(string(body), 64)
	if err != nil {
		log.Fatal(err)
	}
	json.NewEncoder(w).Encode(price)
}

func ChartHandler(w http.ResponseWriter, r *http.Request) {
	printRequestUrl(r)
	ticker := strings.Split(r.URL.Path, "/")[2]
	iex := viperEnvKey("IEX")
	url := "https://cloud.iexapis.com/stable/stock/" + ticker + "/chart/6m?token=" + iex
	resp, err := http.Get(url)
	if err != nil {
		log.Fatal(err)
	}
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}

	formattedBody := CreateChart(body)
	json.NewEncoder(w).Encode(formattedBody)
}

type Chart struct {
	X string    `json:"x"`
	Y []float64 `json:"y"`
}

type StockPrice struct {
	Close     float64 `json:"close"`
	High      float64 `json:"high"`
	Low       float64 `json:"low"`
	Open      float64 `json:"open"`
	PriceDate string  `json:"priceDate"`
}

func CreateChart(chart []uint8) []Chart {
	var raw []map[string]interface{}
	err := json.Unmarshal([]byte(chart), &raw)
	if err != nil {
		log.Fatal(err)
	}

	var stocks []Chart
	for _, r := range raw {
		sp := StockPrice{
			Close:     r["close"].(float64),
			High:      r["high"].(float64),
			Low:       r["low"].(float64),
			Open:      r["open"].(float64),
			PriceDate: r["priceDate"].(string),
		}
		var chartObject Chart
		chartObject.X = sp.PriceDate
		chartObject.Y = append(chartObject.Y, sp.Open)
		chartObject.Y = append(chartObject.Y, sp.High)
		chartObject.Y = append(chartObject.Y, sp.Low)
		chartObject.Y = append(chartObject.Y, sp.Close)
		stocks = append(stocks, chartObject)
	}

	return stocks
}

func QuoteHandler(w http.ResponseWriter, r *http.Request) {
	printRequestUrl(r)
	ticker := strings.Split(r.URL.Path, "/")[2]
	iex := viperEnvKey("IEX")
	url := "https://cloud.iexapis.com/stable/stock/" + ticker + "/quote?token=" + iex
	resp, err := http.Get(url)
	if err != nil {
		log.Fatal(err)
	}
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}

	var data map[string]interface{}
	err = json.Unmarshal([]byte(body), &data)
	if err != nil {
		panic(err)
	}

	json.NewEncoder(w).Encode(data)

	// let ticker = req.url.split('/')[2];
	// let url = `https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${cf.iex}`
	// axios.get(url)
	//   .then((result) => {
	//     // console.log(result.data);
	//     res.send(result.data);
	//   })
	//   .catch(err => {
	//     res.status(500).send(err);
	//   })
}
