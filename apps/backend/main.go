package main

import (
	"fmt"
	"log"
	"net/http"
	"neura-nft/routes"
)

func main() {
	r := routes.NewRouter()

	port := "8080"
	fmt.Println("🚀 Server running on http://localhost:" + port)

	if err := http.ListenAndServe(":"+port, r); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
