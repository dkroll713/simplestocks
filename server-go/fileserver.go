package main

import (
	"log"
	"net/http"
)

type Server struct {
	handler http.Handler
}

func fileserver(port string) *http.Handler {
	fs := http.FileServer(http.Dir("public"))
	http.Handle("/", fs)
	log.Print("Listening on " + port + "...")
	err := http.ListenAndServe(port, nil)
	if err != nil {
		log.Fatal(err)
	}

	return &fs
}
