package main

import (
	"log"
	"net/http"
	"path/filepath"
	"server/routes"
	"time"

	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()

	router.HandleFunc("/api/continents", routes.HandleContinentsApiCall).Methods("GET")
	router.HandleFunc("/api/continent", routes.HandleContinentApiCall).Methods("GET")
	router.HandleFunc("/api/countries", routes.HandleCountriesApiCall).Methods("GET")
	router.HandleFunc("/api/country", routes.HandleCountryApiCall).Methods("GET")
	router.HandleFunc("/api/areas", routes.HandleAdminDivsApiCall).Methods("GET")
	router.HandleFunc("/api/area", routes.HandleAdminDivApiCall).Methods("GET")
	router.HandleFunc("/api/cities", routes.HandleCitiesApiCall).Methods("GET")
	router.HandleFunc("/api/city", routes.HandleCityApiCall).Methods("GET")
	router.HandleFunc("/api/uas", routes.HandleUasApiCall).Methods("GET")
	router.HandleFunc("/googlemapsapikey", routes.HandleGoogleMapKey).Methods("GET")

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
