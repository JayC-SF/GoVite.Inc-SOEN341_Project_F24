package util

import (
	"fmt"
	"reflect"
)

// copy fields from one struct to another
func CopyFields(src interface{}, dest interface{}) error {
	// Get the reflect values of src and dest
	srcVal := reflect.ValueOf(src)
	destVal := reflect.ValueOf(dest)

	// Ensure both src and dest are pointers (to modify dest)
	if srcVal.Kind() != reflect.Struct || destVal.Kind() != reflect.Ptr || destVal.Elem().Kind() != reflect.Struct {
		return fmt.Errorf("invalid arguments")
	}

	// Iterate over the fields of the source struct
	for i := 0; i < srcVal.NumField(); i++ {
		// Get the field in the source struct
		srcField := srcVal.Field(i)

		// Find the matching field in the destination struct
		destField := destVal.Elem().FieldByName(srcVal.Type().Field(i).Name)

		// If the destination struct has a field with the same name and it can be set
		if destField.IsValid() && destField.CanSet() && srcField.Type() == destField.Type() {
			destField.Set(srcField)
		}
	}
	return nil
}
