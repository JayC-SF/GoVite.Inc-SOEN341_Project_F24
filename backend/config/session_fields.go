package config

type SessionFieldsConfig struct {
	Email string
	Role  string
}

var SessionFields = SessionFieldsConfig{
	Email: "email",
	Role:  "role",
}
