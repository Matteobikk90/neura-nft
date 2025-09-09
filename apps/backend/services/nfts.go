package services

import (
	"encoding/json"
	"fmt"
	"net/http"
	"neura-nft/config"
	"neura-nft/constants"
	"neura-nft/models"
)

func GetExploreNFTs(address, category string) ([]models.AlchemyNFT, []models.AlchemyNFT, error) {
	baseUrl := fmt.Sprintf("https://eth-mainnet.g.alchemy.com/nft/v2/%s", config.AlchemyApiKey)
	fmt.Println("📡 Using baseUrl:", baseUrl)

	// ---- Owned NFTs
	ownedUrl := fmt.Sprintf("%s/getNFTs?owner=%s", baseUrl, address)
	fmt.Println("➡️ Requesting owned:", ownedUrl)

	ownedResp, err := http.Get(ownedUrl)
	if err != nil {
		return nil, nil, err
	}
	defer ownedResp.Body.Close()

	var ownedData models.AlchemyResponse
	if err := json.NewDecoder(ownedResp.Body).Decode(&ownedData); err != nil {
		fmt.Println("❌ Decode owned error:", err)
		return nil, nil, err
	}
	fmt.Println("✅ Owned NFTs:", len(ownedData.OwnedNfts))

	// ---- Trending NFTs
	contracts := constants.NftCategories[category]
	fmt.Println("➡️ Fetching trending for", category, "contracts:", contracts)

	var trending []models.AlchemyNFT
	for _, c := range contracts {
		url := fmt.Sprintf("%s/getNFTsForCollection?contractAddress=%s&withMetadata=true", baseUrl, c)
		fmt.Println("➡️ Requesting collection:", url)

		resp, err := http.Get(url)
		if err != nil {
			fmt.Println("❌ Collection fetch error:", err)
			continue
		}

		var colData models.AlchemyResponse
		if err := json.NewDecoder(resp.Body).Decode(&colData); err != nil {
			fmt.Println("❌ Decode collection error:", err)
		} else {
			fmt.Println("✅ NFTs in collection:", len(colData.Nfts))
			for _, nft := range colData.Nfts {
				if len(nft.Media) > 0 && (nft.Media[0].Gateway != "" || nft.Media[0].Thumbnail != "") {
					trending = append(trending, nft)
				}
			}
		}
		resp.Body.Close()
	}

	fmt.Println("✅ Trending total:", len(trending))
	return ownedData.OwnedNfts, trending, nil
}
