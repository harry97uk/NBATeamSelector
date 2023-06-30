package main

import (
	"fmt"
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

	router.HandleFunc("/api/continents", handleContinentsApiCall).Methods("GET")
	router.HandleFunc("/api/countries", handleCountriesApiCall).Methods("GET")
	router.HandleFunc("/api/areas", handleAdminDivsApiCall).Methods("GET")
	router.HandleFunc("/api/cities", handleCitiesApiCall).Methods("GET")
	router.HandleFunc("/api/city", handleCityApiCall).Methods("GET")
	router.HandleFunc("/api/uas", handleUasApiCall).Methods("GET")
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

func handleContinentsApiCall(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	url := "https://api.teleport.org/api/continents/"

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

func handleCountriesApiCall(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	continentID := r.URL.Query().Get("continentID")

	url := ""

	if continentID == "" {
		url = "https://api.teleport.org/api/countries/"
	} else {
		url = "https://api.teleport.org/api/continents/" + continentID + "/countries/"
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

func handleAdminDivsApiCall(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	countryID := r.URL.Query().Get("countryID")

	url := ""

	if countryID == "" {
		log.Fatal("Invalid countryID")
	} else {
		url = "https://api.teleport.org/api/countries/" + countryID + "/admin1_divisions/"
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

func handleCitiesApiCall(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	areaID := r.URL.Query().Get("areaID")
	countryID := r.URL.Query().Get("countryID")

	url := ""

	if countryID != "" && areaID != "" {
		url = "https://api.teleport.org/api/countries/" + countryID + "/admin1_divisions/" + areaID + "/cities/"
	} else {
		url = "https://api.teleport.org/api/cities/"
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

func handleCityApiCall(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	cityID := r.URL.Query().Get("cityID")

	url := ""

	if cityID != "" {
		url = "https://api.teleport.org/api/cities/" + cityID
	} else {
		log.Fatal("Invalid City ID")
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

func handleUasApiCall(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	uaID := r.URL.Query().Get("uaID")

	url := ""

	if uaID != "" {
		fmt.Println(uaID)
		url = "https://api.teleport.org/api/urban_areas/" + uaID + "/"
	} else {
		url = "https://api.teleport.org/api/urban_areas/"
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
