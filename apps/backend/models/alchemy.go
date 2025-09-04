package models

import "encoding/json"

type RpcRequest struct {
	JSONRPC string        `json:"jsonrpc"`
	ID      int           `json:"id"`
	Method  string        `json:"method"`
	Params  []interface{} `json:"params"`
}

type RpcResponse struct {
	Result json.RawMessage `json:"result"`
	Error  interface{}     `json:"error"`
}
