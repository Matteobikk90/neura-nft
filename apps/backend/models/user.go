package models

type User struct {
	ID          string `bson:"_id,omitempty" json:"id"`
	Address     string `bson:"address" json:"address"`
	ChainID     string `bson:"chainId" json:"chainId"`
	Provider    string `bson:"provider,omitempty" json:"provider,omitempty"`
	Icon        string `bson:"icon,omitempty" json:"icon,omitempty"`
	URL         string `bson:"url,omitempty" json:"url,omitempty"`
	CreatedAt   int64  `bson:"createdAt" json:"createdAt"`
	LastLoginAt int64  `bson:"lastLoginAt" json:"lastLoginAt"`
}
