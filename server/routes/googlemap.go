package routes

import (
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func HandleGoogleMapKey(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file: ", err)
	}

	apiKey := os.Getenv("GOOGLE_API_KEY")

	w.Write([]byte(apiKey))
}
