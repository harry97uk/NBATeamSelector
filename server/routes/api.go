package routes

import (
	"io/ioutil"
	"log"
	"net/http"
	"time"
)

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

func HandleContinentsApiCall(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	url := "https://api.teleport.org/api/continents/"

	makeRequest(url, w)
}

func HandleContinentApiCall(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	continentID := r.URL.Query().Get("continentID")

	url := ""

	if continentID != "" {
		url = "https://api.teleport.org/api/continents/" + continentID + "/"
	} else {
		log.Fatal("Invalid Continent ID")
	}

	makeRequest(url, w)
}

func HandleCountriesApiCall(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	continentID := r.URL.Query().Get("continentID")

	url := ""

	if continentID == "" {
		url = "https://api.teleport.org/api/countries/"
	} else {
		url = "https://api.teleport.org/api/continents/" + continentID + "/countries/"
	}

	makeRequest(url, w)
}

func HandleCountryApiCall(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	countryID := r.URL.Query().Get("countryID")

	url := ""

	if countryID == "" {
		log.Fatal("Invalid Country ID")
	} else {
		url = "https://api.teleport.org/api/countries/" + countryID + "/"
	}

	makeRequest(url, w)
}

func HandleAdminDivsApiCall(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	countryID := r.URL.Query().Get("countryID")

	url := ""

	if countryID == "" {
		log.Fatal("Invalid countryID")
	} else {
		url = "https://api.teleport.org/api/countries/" + countryID + "/admin1_divisions/"
	}

	makeRequest(url, w)
}

func HandleAdminDivApiCall(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	areaID := r.URL.Query().Get("areaID")
	countryID := r.URL.Query().Get("countryID")

	url := ""

	if countryID != "" && areaID != "" {
		url = "https://api.teleport.org/api/countries/" + countryID + "/admin1_divisions/" + areaID + "/"
	} else {
		log.Fatal("Invalid Area or Country ID")
	}

	makeRequest(url, w)
}

func HandleCitiesApiCall(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	areaID := r.URL.Query().Get("areaID")
	countryID := r.URL.Query().Get("countryID")

	url := ""

	if countryID != "" && areaID != "" {
		url = "https://api.teleport.org/api/countries/" + countryID + "/admin1_divisions/" + areaID + "/cities/"
	} else {
		url = "https://api.teleport.org/api/cities/"
	}

	makeRequest(url, w)
}

func HandleCityApiCall(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	cityID := r.URL.Query().Get("cityID")

	url := ""

	if cityID != "" {
		url = "https://api.teleport.org/api/cities/" + cityID
	} else {
		log.Fatal("Invalid City ID")
	}

	makeRequest(url, w)
}

func HandleUasApiCall(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	uaID := r.URL.Query().Get("uaID")

	url := ""

	if uaID != "" {
		url = "https://api.teleport.org/api/urban_areas/" + uaID + "/"
	} else {
		url = "https://api.teleport.org/api/urban_areas/"
	}

	makeRequest(url, w)
}

func HandleUaDetailsApiCall(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	uaID := r.URL.Query().Get("uaID")

	url := ""

	if uaID != "" {
		url = "https://api.teleport.org/api/urban_areas/" + uaID + "/details/"
	} else {
		log.Fatal("Invalid UAID for details call")
	}

	makeRequest(url, w)
}

func makeRequest(url string, w http.ResponseWriter) {
	spaceClient := http.Client{
		Timeout: time.Second * 10, // Timeout after 2 seconds
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
