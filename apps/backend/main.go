package main

import (
	"fmt"
	"log"
	"net/http"
	"neura-nft/config"
	"neura-nft/db"
	"neura-nft/routes"

	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		fmt.Println("⚠️ No .env file found, using system env vars")
	}
	config.Init()
	db.Connect()
	r := routes.NewRouter()

	port := "8080"
	fmt.Println("🚀 Server running on http://localhost:" + port)

	if err := http.ListenAndServe(":"+port, r); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
