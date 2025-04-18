/* eslint-env jest */
import { render, screen } from '@testing-library/react';
import App from '../App.jsx';

test('renders controls and preview', () => {
  render(<App />);
  expect(screen.getByText(/Controls/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Maze Preview/i })).toBeInTheDocument();
});
