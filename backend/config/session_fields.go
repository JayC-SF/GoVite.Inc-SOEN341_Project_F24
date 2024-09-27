package config

type SessionFieldsConfig struct {
	Username string
	Role     string
}

var SessionFields = SessionFieldsConfig{
	Username: "username",
	Role:     "role",
}
