package config

import (
	"log"
	"os"
)

var AlchemyApiKey string

func Init() {
	AlchemyApiKey = os.Getenv("ALCHEMY_API_KEY")
	if AlchemyApiKey == "" {
		log.Fatal("❌ Missing ALCHEMY_API_KEY")
	}
}
