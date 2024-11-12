package main

import (
	"testing"
)

// Function you want to test
func Add(a, b int) int {
	return a + b
}

// Basic test case
func TestAdd(t *testing.T) {
	result := Add(2, 3)
	expected := 5

	if result != expected {
		t.Errorf("Add(2, 3) = %d; want %d", result, expected)
	}
}
