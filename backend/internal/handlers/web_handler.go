package handlers

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

func index(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "index page")
}

func WebHandler() {
	fmt.Println("web started: 127.0.0.1:8080")
	rtr := mux.NewRouter()
	rtr.HandleFunc("/", index)
	http.Handle("/", rtr)
	http.ListenAndServe(":8080", nil)
}
