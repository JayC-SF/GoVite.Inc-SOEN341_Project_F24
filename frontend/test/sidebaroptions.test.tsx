import { describe, it, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import {SidebarOptions} from '../src/modules/SidebarOptions';
import React, { isValidElement } from 'react';
import '@testing-library/jest-dom';

//test home option
test('home option', ()=>{
  render(<SidebarOptions/>)
  const homeText = screen.getByText('Home')
  expect(homeText).toBeInTheDocument();
})

//test Classes option
test('classes option', ()=>{
    render(<SidebarOptions/>)
    const classesText = screen.getByText('Classes')
    expect(classesText).toBeInTheDocument();
  })

//test Groups option
test('Groups option', ()=>{
    render(<SidebarOptions/>)
    const groupsText = screen.getByText('Groups')
    expect(groupsText).toBeInTheDocument();
  })