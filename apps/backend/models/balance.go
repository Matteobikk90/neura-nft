package models

type BalanceQuantity struct {
	Decimals string `json:"decimals"`
	Numeric  string `json:"numeric"`
}

type Balance struct {
	Name     string          `json:"name"`
	Symbol   string          `json:"symbol"`
	ChainId  string          `json:"chainId"`
	Address  *string         `json:"address,omitempty"`
	Price    float64         `json:"price"`
	Value    *float64        `json:"value,omitempty"`
	Quantity BalanceQuantity `json:"quantity"`
	IconUrl  string          `json:"iconUrl"`
}

type BlockchainApiBalanceResponse struct {
	Balances []Balance `json:"balances"`
}

type MetaReq struct {
	JSONRPC string        `json:"jsonrpc"`
	ID      int           `json:"id"`
	Method  string        `json:"method"`
	Params  []interface{} `json:"params"`
}

type TokenMeta struct {
	Decimals *int   `json:"decimals"`
	Name     string `json:"name"`
	Symbol   string `json:"symbol"`
	Logo     string `json:"logo"`
}

type MetaRes struct {
	JSONRPC string    `json:"jsonrpc"`
	ID      int       `json:"id"`
	Result  TokenMeta `json:"result"`
}
