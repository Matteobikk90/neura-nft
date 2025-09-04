package handlers

import (
	"encoding/json"
	"net/http"
	"neura-nft/services"
)

func ExploreNFTsHandler(w http.ResponseWriter, r *http.Request) {
	address := r.URL.Query().Get("address")
	category := r.URL.Query().Get("category")

	if address == "" || category == "" {
		http.Error(w, "missing address or category", http.StatusBadRequest)
		return
	}

	owned, trending, err := services.GetExploreNFTs(address, category)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(map[string]any{
		"owned":    owned,
		"trending": trending,
	})
}
