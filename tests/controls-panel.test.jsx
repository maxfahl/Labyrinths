/* eslint-env jest */
import { describe, expect, test } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import ControlsPanel from '../components/ControlsPanel';

describe('ControlsPanel controls', () => {
  test('renders and updates maze type select', () => {
    render(<ControlsPanel />);
    const select = screen.getByLabelText(/Type/i);
    expect(select).toBeInTheDocument();
    // Open select and choose a different type
    fireEvent.mouseDown(select);
    const roundOption = screen.getByText(/Round/i);
    fireEvent.click(roundOption);
    expect(screen.getByText(/Round/i)).toBeInTheDocument();
  });

  test('renders and updates width and height inputs', () => {
    render(<ControlsPanel />);
    const widthInput = screen.getByLabelText(/Width/i);
    const heightInput = screen.getByLabelText(/Height/i);
    expect(widthInput).toBeInTheDocument();
    expect(heightInput).toBeInTheDocument();
    fireEvent.change(widthInput, { target: { value: 800 } });
    fireEvent.change(heightInput, { target: { value: 400 } });
    expect(widthInput).toHaveValue(800);
    expect(heightInput).toHaveValue(400);
  });

  test('renders complexity slider', () => {
    render(<ControlsPanel />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0]).toBeInTheDocument();
    expect(sliders[0]).toHaveAttribute('aria-valuenow', '50');
  });

  test('renders and updates line color input', () => {
    render(<ControlsPanel />);
    const lineColorInput = screen.getByLabelText(/Line Color/i);
    expect(lineColorInput).toBeInTheDocument();
    fireEvent.change(lineColorInput, { target: { value: '#123456' } });
    expect(lineColorInput).toHaveValue('#123456');
  });

  test('renders and updates background color input', () => {
    render(<ControlsPanel />);
    const bgColorInput = screen.getByLabelText(/Background Color/i);
    expect(bgColorInput).toBeInTheDocument();
    fireEvent.change(bgColorInput, { target: { value: '#abcdef' } });
    expect(bgColorInput).toHaveValue('#abcdef');
  });

  test('renders wall thickness slider', () => {
    render(<ControlsPanel />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders[1]).toBeInTheDocument();
    expect(sliders[1]).toHaveAttribute('aria-valuenow', '4');
  });

  test('renders and updates seed input', () => {
    render(<ControlsPanel />);
    const seedInput = screen.getByLabelText(/Seed/i);
    expect(seedInput).toBeInTheDocument();
    fireEvent.change(seedInput, { target: { value: 'test-seed-123' } });
    expect(seedInput).toHaveValue('test-seed-123');
  });

  test('renders and updates start/end position selector', () => {
    render(<ControlsPanel />);
    const startSelect = screen.getByLabelText(/Start Position/i);
    const endSelect = screen.getByLabelText(/End Position/i);
    expect(startSelect).toBeInTheDocument();
    expect(endSelect).toBeInTheDocument();
    fireEvent.change(startSelect, { target: { value: 'top-left' } });
    fireEvent.change(endSelect, { target: { value: 'bottom-right' } });
    expect(startSelect).toHaveValue('top-left');
    expect(endSelect).toHaveValue('bottom-right');
  });

  test('renders and updates maze theme selector', () => {
    render(<ControlsPanel />);
    const themeSelect = screen.getByLabelText(/Maze Theme/i);
    expect(themeSelect).toBeInTheDocument();
    fireEvent.change(themeSelect, { target: { value: 'print' } });
    expect(themeSelect).toHaveValue('print');
  });
}); 