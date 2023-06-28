package main

import (
	"io/ioutil"
	"log"
	"net/http"
	"path/filepath"
	"time"

	"github.com/gorilla/mux"
)

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

func main() {
	router := mux.NewRouter()

	router.HandleFunc("/api/players", handlePlayersApiCall).Methods("GET")
	router.HandleFunc("/signin", func(w http.ResponseWriter, r *http.Request) {}).Methods("POST")
	router.HandleFunc("/dashboard", func(w http.ResponseWriter, r *http.Request) {}).Methods("GET")

	staticDir := "../client/nba-selector-react-project/build"
	staticFileServer := http.FileServer(http.Dir(staticDir))

	router.PathPrefix("/").Handler(staticFileServer)

	router.PathPrefix("/").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, filepath.Join(staticDir, "index.html"))
	})

	srv := &http.Server{
		Handler: router,
		Addr:    "0.0.0.0:8000",
		// Good practice: enforce timeouts for servers you create!
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Fatal(srv.ListenAndServe())
}

func handlePlayersApiCall(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	params := r.URL.Query()

	page := params.Get("page")
	per_page := params.Get("per_page")
	player_id := params.Get("player_id")

	url := ""

	if player_id == "" {
		url = "https://www.balldontlie.io/api/v1/players?page=" + page + "?per_page=" + per_page
	} else {
		url = "https://www.balldontlie.io/api/v1/players/" + player_id
	}

	spaceClient := http.Client{
		Timeout: time.Second * 2, // Timeout after 2 seconds
	}

	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		log.Fatal(err)
	}

	req.Header.Set("User-Agent", "spacecount-tutorial")

	res, getErr := spaceClient.Do(req)
	if getErr != nil {
		log.Fatal(getErr)
	}

	if res.Body != nil {
		defer res.Body.Close()
	}

	body, readErr := ioutil.ReadAll(res.Body)
	if readErr != nil {
		log.Fatal(readErr)
	}

	w.Write(body)
}
