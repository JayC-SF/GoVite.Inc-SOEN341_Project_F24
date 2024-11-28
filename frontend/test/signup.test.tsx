import { describe, it, expect} from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '../src/pages/home/HomePage';
import React from 'react';
import '@testing-library/jest-dom';

describe('HomePage', () => {
    it('should display "Sign Up" links', () => {
      render(<HomePage />);
  
      // Get all links with role "link" and filter for the one with the "Sign Up" text
      const signUpLinks = screen.getAllByRole('link', { name: /sign up/i });
      const signUpLink = signUpLinks.find(link => link.getAttribute('href') === '#sign-up');
  
      expect(signUpLink).toBeInTheDocument();
    });
  });



