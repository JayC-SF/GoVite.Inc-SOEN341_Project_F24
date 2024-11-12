package config

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

// TestSessionFieldsConfig checks if SessionFieldsConfig values are set as expected
func TestSessionFieldsConfig(t *testing.T) {
	assert.Equal(t, "email", SessionFields.Email, "Expected Email field to be 'email'")
	assert.Equal(t, "role", SessionFields.Role, "Expected Role field to be 'role'")
}
