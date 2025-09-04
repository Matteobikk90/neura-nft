package models

type AlchemyNFT struct {
	Media []struct {
		Gateway   string `json:"gateway"`
		Thumbnail string `json:"thumbnail"`
	} `json:"media"`
	Title    string `json:"title,omitempty"`
	Contract struct {
		Address string `json:"address"`
	} `json:"contract"`
	ContractMetadata struct {
		Name             string `json:"name,omitempty"`
		ContractDeployer string `json:"contractDeployer,omitempty"`
	} `json:"contractMetadata,omitempty"`
	ID struct {
		TokenId string `json:"tokenId"`
	} `json:"id"`
	Metadata struct {
		Name       string        `json:"name,omitempty"`
		Attributes []interface{} `json:"attributes,omitempty"`
	} `json:"metadata,omitempty"`
}

type AlchemyResponse struct {
	OwnedNfts []AlchemyNFT `json:"ownedNfts,omitempty"`
	Nfts      []AlchemyNFT `json:"nfts,omitempty"`
}
