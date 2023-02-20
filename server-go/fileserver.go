package serverFunctions

import (
	"net/http"
)

type Server struct {
	handler http.Handler
}

func FileServer(port string) *http.Handler {
	fs := http.FileServer(http.Dir("public"))

	return &fs
}
