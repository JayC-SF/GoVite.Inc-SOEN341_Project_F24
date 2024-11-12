package config

import (
	"path/filepath"
	"testing"

	"github.com/stretchr/testify/assert"
)

// TestPathsConfig checks if PathsConfig values are set as expected
func TestPathsConfig(t *testing.T) {
	expectedStaticFilesPath := filepath.Join("..", "frontend", "dist")
	expectedIndexHTMLPath := filepath.Join("..", "frontend", "dist", "index.html")

	assert.Equal(t, expectedStaticFilesPath, Paths.FrontendStaticFiles, "Expected FrontendStaticFiles to be set correctly")
	assert.Equal(t, expectedIndexHTMLPath, Paths.FrontEndIndexHTML, "Expected FrontEndIndexHTML to be set correctly")
}
