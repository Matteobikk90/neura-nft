package services

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"neura-nft/config"
	"neura-nft/models"
)

func GetTransactions(address string) ([]map[string]interface{}, error) {
	url := fmt.Sprintf("https://eth-mainnet.g.alchemy.com/v2/%s", config.AlchemyApiKey)

	payload := map[string]interface{}{
		"jsonrpc": "2.0",
		"id":      1,
		"method":  "alchemy_getAssetTransfers",
		"params": []interface{}{
			map[string]interface{}{
				"fromBlock": "0x0",
				"toAddress": address,
				"category":  []string{"external", "erc20", "erc721"},
			},
		},
	}

	b, _ := json.Marshal(payload)

	resp, err := http.Post(url, "application/json", bytes.NewBuffer(b))
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var res models.AlchemyTxResponse
	if err := json.NewDecoder(resp.Body).Decode(&res); err != nil {
		return nil, err
	}

	return res.Result.Transfers, nil
}
