package routes

import (
	"neura-nft/handlers"

	"github.com/go-chi/chi/v5"
)

func NewRouter() *chi.Mux {
	r := chi.NewRouter()

	r.Route("/api", func(r chi.Router) {
		r.Route("/token", func(r chi.Router) {
			r.Get("/price", handlers.PriceHandler)
			r.Get("/balances", handlers.BalanceHandler)
			r.Get("/transactions", handlers.TransactionsHandler)
		})
		r.Route("/nfts", func(r chi.Router) {
			r.Get("/", handlers.ExploreNFTsHandler)
		})
		r.Route("/user", func(r chi.Router) {
			r.Post("/", handlers.UpsertUserHandler)
			r.Get("/", handlers.GetUserHandler)
		})
	})

	return r
}
