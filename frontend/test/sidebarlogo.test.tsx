import {expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import {SidebarLogo} from '../src/components/SidebarLogo';
import React from 'react';
import '@testing-library/jest-dom';

//test sidebar logo
test('Sidebar logo', ()=>{
  render(<SidebarLogo/>)
  const imgElement = screen.getByRole('img')
  expect(imgElement).toHaveClass('h-16');
})