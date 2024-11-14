// Import necessary testing utilities and dependencies
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SelectRating from '../src/modules/SelectRating';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import '@testing-library/jest-dom';

describe('SelectRating', () => {
  
  // Test case 1: Verify that all rating options are rendered in the dropdown
  it('renders all rating options', () => {
    render(<SelectRating value={3} />);
    
    // Check that all options appear in the dropdown list
    expect(screen.getByText('1 - Poor')).toBeInTheDocument();
    expect(screen.getByText('2 - Fair')).toBeInTheDocument();
    expect(screen.getByText('3 - Good')).toBeInTheDocument();
    expect(screen.getByText('4 - Very Good')).toBeInTheDocument();
    expect(screen.getByText('5 - Excellent')).toBeInTheDocument();
  });

  // Test case 2: Verify that the correct initial value is selected
  it('sets the correct initial value', () => {
    render(<SelectRating value={3} />);
    
    // Check that the dropdown has "3 - Good" selected initially
    expect(screen.getByRole('combobox')).toHaveValue('3'); // Ensure the number is passed as a string here
  });

  // Test case 3: Verify that selecting a new option calls onSelectRating with the correct value
  it('calls onSelectRating with the selected value when an option is selected', async () => {
    const handleSelectRating = vi.fn();
    render(<SelectRating value={3} onSelectRating={handleSelectRating} />);
    
    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, '4'); // Select "4 - Very Good"

    // Verify that the onSelectRating function was called with the selected value (4)
    expect(handleSelectRating).toHaveBeenCalledWith(4);
  });
});
