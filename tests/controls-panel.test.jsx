/* eslint-env jest */
import { describe, expect, test } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { defaultOptions } from '../App';
import ControlsPanel from '../components/ControlsPanel.tsx';

function renderPanelWithState(initialOptions = defaultOptions) {
  function Wrapper() {
    const [options, setOptions] = React.useState(initialOptions);
    return <ControlsPanel options={options} setOptions={setOptions} />;
  }
  return render(<Wrapper />);
}

describe('ControlsPanel controls', () => {
  test('renders and updates maze type select', () => {
    renderPanelWithState();
    const select = screen.getByLabelText(/Type/i);
    expect(select).toBeInTheDocument();
    // Open select and choose a different type
    fireEvent.mouseDown(select);
    const roundOption = screen.getByText(/Round/i);
    fireEvent.click(roundOption);
    expect(screen.getByText(/Round/i)).toBeInTheDocument();
  });

  test('renders and updates width and height inputs', () => {
    renderPanelWithState();
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
    renderPanelWithState();
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0]).toBeInTheDocument();
    expect(sliders[0]).toHaveAttribute('aria-valuenow', '50');
  });

  test('renders and updates line color input', () => {
    renderPanelWithState();
    const lineColorInput = screen.getByLabelText(/Line Color/i);
    expect(lineColorInput).toBeInTheDocument();
    fireEvent.change(lineColorInput, { target: { value: '#123456' } });
    expect(lineColorInput).toHaveValue('#123456');
  });

  test('renders and updates background color input', () => {
    renderPanelWithState();
    const bgColorInput = screen.getByLabelText(/Background Color/i);
    expect(bgColorInput).toBeInTheDocument();
    fireEvent.change(bgColorInput, { target: { value: '#abcdef' } });
    expect(bgColorInput).toHaveValue('#abcdef');
  });

  test('renders wall thickness slider', () => {
    renderPanelWithState();
    const sliders = screen.getAllByRole('slider');
    expect(sliders[1]).toBeInTheDocument();
    expect(sliders[1]).toHaveAttribute('aria-valuenow', '4');
  });

  test('renders and updates seed input', () => {
    renderPanelWithState();
    const seedInput = screen.getByLabelText(/Seed/i);
    expect(seedInput).toBeInTheDocument();
    fireEvent.change(seedInput, { target: { value: 'test-seed-123' } });
    expect(seedInput).toHaveValue('test-seed-123');
  });

  test('renders and updates start/end position selector', () => {
    renderPanelWithState();
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
    renderPanelWithState();
    const themeSelect = screen.getByLabelText(/Maze Theme/i);
    expect(themeSelect).toBeInTheDocument();
    fireEvent.change(themeSelect, { target: { value: 'print' } });
    expect(themeSelect).toHaveValue('print');
  });

  test('renders and toggles solution path checkbox', () => {
    renderPanelWithState();
    const checkbox = screen.getByLabelText(/Show Solution/i);
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  test('renders and toggles grid overlay checkbox', () => {
    renderPanelWithState();
    const checkbox = screen.getByLabelText(/Show Grid/i);
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  test('renders and toggles animated generation checkbox', () => {
    renderPanelWithState();
    const checkbox = screen.getByLabelText(/Animate Generation/i);
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  test('renders and toggles high contrast checkbox', () => {
    renderPanelWithState();
    const checkbox = screen.getByLabelText(/High Contrast/i);
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  test('renders and updates font size input', () => {
    renderPanelWithState();
    const fontSizeInput = screen.getByLabelText(/Font Size/i);
    expect(fontSizeInput).toBeInTheDocument();
    fireEvent.change(fontSizeInput, { target: { value: 24 } });
    expect(fontSizeInput).toHaveValue(24);
  });
}); 