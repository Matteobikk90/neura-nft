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
	})

	return r
}
