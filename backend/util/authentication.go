package util

import (
	"golang.org/x/crypto/bcrypt"
)

// HashPassword simply hashes a string password using a default cost (work factor).
// Once the password hashed, it converts the hash into a string and returns.
func HashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(hashedPassword), err
}

// ComparePassword compares a password with a hashed password.
// If the hashes do not match,  or an error occurs it returns false
// otherwise the function will return true
func CompareHashAndPassword(hashedPassword, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	return err == nil
}
