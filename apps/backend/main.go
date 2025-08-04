package main

import (
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
)

func main() {
	r := chi.NewRouter()

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Neura NFT Backend is running 🚀"))
	})

	log.Println("🚀 Server running on http://localhost:8080")
	http.ListenAndServe(":8080", r)
}
