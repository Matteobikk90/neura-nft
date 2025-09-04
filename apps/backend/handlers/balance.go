package handlers

import (
	"encoding/json"
	"net/http"
	"neura-nft/models"
	"neura-nft/services"
)

func BalanceHandler(w http.ResponseWriter, r *http.Request) {
	address := r.URL.Query().Get("address")
	if address == "" {
		http.Error(w, "missing address", http.StatusBadRequest)
		return
	}

	balances, err := services.GetAllBalances(address)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := models.BlockchainApiBalanceResponse{
		Balances: balances,
	}

	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(response)
}
