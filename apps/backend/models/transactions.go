package models

type AlchemyTxResponse struct {
	Result struct {
		Transfers []map[string]interface{} `json:"transfers"`
		PageKey   string                   `json:"pageKey,omitempty"`
	} `json:"result"`
}
