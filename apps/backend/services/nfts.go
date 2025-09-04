package services

import (
	"encoding/json"
	"fmt"
	"net/http"
	"neura-nft/constants"
	"neura-nft/models"
	"os"
)

func GetExploreNFTs(address, category string) ([]models.AlchemyNFT, []models.AlchemyNFT, error) {
	apiKey := os.Getenv("ALCHEMY_API_KEY")
	baseUrl := fmt.Sprintf("https://eth-mainnet.g.alchemy.com/nft/v2/%s", apiKey)

	// ---- Owned NFTs
	ownedUrl := fmt.Sprintf("%s/getNFTsForOwner?owner=%s", baseUrl, address)
	ownedResp, err := http.Get(ownedUrl)
	if err != nil {
		return nil, nil, err
	}
	defer ownedResp.Body.Close()

	var ownedData models.AlchemyResponse
	if err := json.NewDecoder(ownedResp.Body).Decode(&ownedData); err != nil {
		return nil, nil, err
	}

	// ---- Trending NFTs
	contracts := constants.NftCategories[category]
	var trending []models.AlchemyNFT

	for _, c := range contracts {
		url := fmt.Sprintf("%s/getNFTsForCollection?contractAddress=%s&withMetadata=true", baseUrl, c)
		resp, err := http.Get(url)
		if err != nil {
			continue
		}
		defer resp.Body.Close()

		var colData models.AlchemyResponse
		if err := json.NewDecoder(resp.Body).Decode(&colData); err == nil {
			for _, nft := range colData.Nfts {
				if len(nft.Media) > 0 && (nft.Media[0].Gateway != "" || nft.Media[0].Thumbnail != "") {
					trending = append(trending, nft)
				}
			}
		}
	}

	return ownedData.OwnedNfts, trending, nil
}
