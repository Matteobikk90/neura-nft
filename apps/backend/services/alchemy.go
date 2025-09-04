package services

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"neura-nft/models"
	"os"
)

func callAlchemy(method string, params []interface{}) (json.RawMessage, error) {
	apiKey := os.Getenv("ALCHEMY_API_KEY")
	url := fmt.Sprintf("https://eth-mainnet.g.alchemy.com/v2/%s", apiKey)

	req := models.RpcRequest{JSONRPC: "2.0", ID: 1, Method: method, Params: params}
	body, _ := json.Marshal(req)

	resp, err := http.Post(url, "application/json", bytes.NewBuffer(body))
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var res models.RpcResponse
	if err := json.NewDecoder(resp.Body).Decode(&res); err != nil {
		return nil, err
	}
	if res.Error != nil {
		return nil, fmt.Errorf("RPC error: %v", res.Error)
	}

	return res.Result, nil
}
