package handlers

import (
	"encoding/json"
	"net/http"
	"neura-nft/models"
)

func PriceHandler(w http.ResponseWriter, r *http.Request) {
	url := "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true"

	resp, err := http.Get(url)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	var cg models.PriceChangeResponse
	if err := json.NewDecoder(resp.Body).Decode(&cg); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	out := map[string]float64{"priceChange": cg.Ethereum.Usd24hChange}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(out); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
