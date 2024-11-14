import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RatingQuestion from '../src/components/RatingQuestion';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';  // Make sure 'vi' is imported from 'vitest'
import React from 'react';
import { useFormHookContext } from '../src/hooks/useFormHook';

// Mock the useFormHookContext to provide controlled test behavior
vi.mock('../src/hooks/useFormHook', () => ({
  // Mocking the `useFormHookContext` directly
  useFormHookContext: vi.fn(),
}));

describe('RatingQuestion', () => {
  const mockSetValue = vi.fn();
  const mockWatch = vi.fn();

  beforeEach(() => {
    // Define the return values of the mocked functions
    mockWatch.mockReturnValue(1); // Default value for the `watch` function
    (useFormHookContext as vi.Mock).mockReturnValue({
      setValue: mockSetValue,
      watch: mockWatch,
    });
  });

  afterEach(() => {
    // Clear mocks after each test
    vi.clearAllMocks();
  });

  // Test case 1: Check if the component renders the label correctly
  it('renders the provided label', () => {
    render(<RatingQuestion idx={0} criterionId="crit1" label="Quality" />);
    
    // Expect to see the label rendered correctly
    expect(screen.getByText('Quality')).toBeInTheDocument();
  });

  // Test case 2: Verify that the default SelectRating value is rendered
  it('renders with the default rating option', () => {
    render(<RatingQuestion idx={0} criterionId="crit1" label="Quality" />);
    
    // Verify the SelectRating component shows the default value
    expect(screen.getByRole('combobox')).toHaveValue('1');
  });

  // Test case 3: Verify that selecting a new rating calls setValue with correct arguments
  it('calls setValue when a new rating is selected', async () => {
    render(<RatingQuestion idx={0} criterionId="crit1" label="Quality" />);
    
    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, '3'); // Select a new rating option

    // Ensure setValue is called with the correct index and selected rating
    expect(mockSetValue).toHaveBeenCalledWith('criteria.0.grade', 3);
  });
});
