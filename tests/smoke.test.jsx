/* eslint-env jest */
import { expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import App from '../App.tsx';

test('renders controls and preview', () => {
  render(<App />);
  expect(screen.getByText(/Controls/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Maze Preview/i })).toBeInTheDocument();
});
