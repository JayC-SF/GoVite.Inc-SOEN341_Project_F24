import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SidebarOptions } from '../src/modules/SidebarOptions'; 
import React from 'react';
import '@testing-library/jest-dom';

describe('SidebarOptions', () => {
  it('should display "Log Out" option', () => {
    render(<SidebarOptions />);

    // Check for the "Log Out" option
    const logoutOption = screen.getByRole('button', { name: /log out/i });

    expect(logoutOption).toBeInTheDocument();
  });
});
