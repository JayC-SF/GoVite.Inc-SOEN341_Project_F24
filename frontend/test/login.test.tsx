import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '../src/pages/home/HomePage';
import React from 'react';
import '@testing-library/jest-dom';

describe('HomePage', () => {
  it('should display "Login" links', () => {
    render(<HomePage />);

    // Get all links with role "link" and filter for those with the "Login" text
    const loginLinks = screen.getAllByRole('link', { name: /login/i });
    const loginLink = loginLinks.find(link => link.getAttribute('href') === '#login' || link.getAttribute('href')?.includes('login'));

    expect(loginLink).toBeInTheDocument();
  });
});
