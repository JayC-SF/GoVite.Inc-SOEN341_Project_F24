package config

import "path/filepath"

// Defined crossplatform path for the frontend the static files
type PathsConfig struct {
	FrontendStaticFiles string
	FrontEndIndexHTML   string
}

var Paths = PathsConfig{
	FrontendStaticFiles: filepath.Join("..", "frontend", "dist"),
	FrontEndIndexHTML:   filepath.Join("..", "frontend", "dist", "index.html"),
}
