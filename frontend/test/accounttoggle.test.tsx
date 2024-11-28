import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import {AccountToggle} from '../src/modules/AccountToggle';
import React from 'react';
import '@testing-library/jest-dom';

//test sidebar logo
test('Sidebar logo', ()=>{
  render(<AccountToggle/>)
  const imgElement = screen.getByRole('img')
  expect(imgElement).toHaveClass('size-8');
})