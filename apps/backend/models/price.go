package models

type PriceChangeResponse struct {
	Ethereum struct {
		Usd          float64 `json:"usd"`
		Usd24hChange float64 `json:"usd_24h_change"`
	} `json:"ethereum"`
}
