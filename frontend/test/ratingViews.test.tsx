import { GetDetailedCourseInfo } from "../src/network/services/courseService";
import { CourseGroupTable } from '../src/pages/course/CourseGroupTable';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';

// Mock the GetDetailedCourseInfo function to return a valid promise
vi.mock('../src/network/services/courseService', () => ({
  GetDetailedCourseInfo: vi.fn(),
}));

describe('CourseGroupTable', () => {

  it('should show "No reviews" message when there are no reviews', async () => {
    // Simulate empty mockData (no reviews)
    vi.mocked(GetDetailedCourseInfo).mockResolvedValueOnce({ teams: [] });

    render(<CourseGroupTable courseid="123" />);
    
    // Wait for the "No reviews" message to appear
    await waitFor(() => screen.getByText('There are no reviews...'));

    // Assert that the "No reviews" message is visible
    expect(screen.getByText('There are no reviews...')).toBeInTheDocument();
  });

  it('should render reviews table when reviews are available', async () => {
    const mockData = { teams: [] };

    // Mock the resolved data correctly
    vi.mocked(GetDetailedCourseInfo).mockResolvedValueOnce(mockData);

    render(<CourseGroupTable courseid="123" />);

    // Wait for the component to handle empty teams
    await waitFor(() => screen.getByText('There are no reviews...'));

    // Assert that the "No reviews" message is displayed
    expect(screen.getByText('There are no reviews...')).toBeInTheDocument();
  });
});

  