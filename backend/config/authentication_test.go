package config

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

// TestSessionConfig checks if SessionConfig has expected values
func TestSessionConfig(t *testing.T) {
	assert.Equal(t, 3600, SessionConfig.MaxAge, "Expected MaxAge to be 3600 seconds (1 hour)")
	assert.True(t, SessionConfig.HttpOnly, "Expected HttpOnly to be true for security")
}
