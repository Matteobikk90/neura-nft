package services

import (
	"encoding/json"
	"fmt"
	"math/big"
	"net/http"
	"neura-nft/models"
)

func GetEthPrice() (float64, float64, error) {
	url := "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true"

	resp, err := http.Get(url)
	if err != nil {
		return 0, 0, fmt.Errorf("failed to fetch ETH price: %w", err)
	}
	defer resp.Body.Close()

	var data models.PriceChangeResponse
	if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
		return 0, 0, fmt.Errorf("failed to decode ETH price response: %w", err)
	}

	return data.Ethereum.Usd, data.Ethereum.Usd24hChange, nil
}

func GetEthBalance(address string) (float64, error) {
	raw, err := callAlchemy("eth_getBalance", []interface{}{address, "latest"})
	if err != nil {
		return 0, err
	}
	var hexBalance string
	if err := json.Unmarshal(raw, &hexBalance); err != nil {
		return 0, err
	}

	// convert hex string (wei) → ETH float
	wei := new(big.Int)
	_, ok := wei.SetString(hexBalance[2:], 16)
	if !ok {
		return 0, fmt.Errorf("invalid hex balance: %s", hexBalance)
	}

	eth := new(big.Float).Quo(new(big.Float).SetInt(wei), big.NewFloat(1e18))
	val, _ := eth.Float64()

	return val, nil
}

func GetTokenBalances(address string) ([]map[string]interface{}, error) {
	raw, err := callAlchemy("alchemy_getTokenBalances", []interface{}{address})
	if err != nil {
		return nil, err
	}

	var result struct {
		TokenBalances []map[string]interface{} `json:"tokenBalances"`
	}
	if err := json.Unmarshal(raw, &result); err != nil {
		return nil, err
	}

	return result.TokenBalances, nil
}

func GetAllBalances(address string) ([]models.Balance, error) {
	balances := make([]models.Balance, 0)

	// 1. ETH balance
	eth, err := GetEthBalance(address)
	if err == nil {
		price, change, _ := GetEthPrice()
		val := eth * price
		balances = append(balances, models.Balance{
			Name:    "Ethereum",
			Symbol:  "ETH",
			ChainId: "1",
			Price:   price,
			Value:   &val,
			Quantity: models.BalanceQuantity{
				Decimals: "18",
				Numeric:  fmt.Sprintf("%f", eth),
			},
			IconUrl: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
		})
		_ = change // store elsewhere if you want EthOverview
	}

	// 2. ERC-20 balances (simplified)
	tokens, _ := GetTokenBalances(address)
	for _, tb := range tokens {
		bal := tb["tokenBalance"].(string)
		contract := tb["contractAddress"].(string)
		if bal == "0x0" {
			continue
		}
		// TODO: fetch metadata (decimals/symbol) + price
		balances = append(balances, models.Balance{
			Name:    "Token",
			Symbol:  "TKN",
			ChainId: "1",
			Address: &contract,
			Price:   0,
			Quantity: models.BalanceQuantity{
				Decimals: "18",
				Numeric:  bal,
			},
			IconUrl: "",
		})
	}

	return balances, nil
}
