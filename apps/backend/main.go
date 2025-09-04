package main

import (
	"fmt"
	"log"
	"net/http"
	"neura-nft/db"
	"neura-nft/routes"
)

func main() {
	db.Connect()
	r := routes.NewRouter()

	port := "8080"
	fmt.Println("🚀 Server running on http://localhost:" + port)

	if err := http.ListenAndServe(":"+port, r); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
