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

  test('renders wall thickness slider and reflects value', () => {
    renderPanelWithState();
    const wallSlider = screen.getByRole('slider', { name: /Wall Thickness/i });
    expect(wallSlider).toBeInTheDocument();
    expect(wallSlider).toHaveAttribute('aria-valuenow', '4');
  });

  test('renders seed slider', () => {
    renderPanelWithState();
    const seedSlider = screen.getByRole('slider', { name: /Seed/i });
    expect(seedSlider).toBeInTheDocument();
  });

  test('renders line color input', () => {
    renderPanelWithState();
    const lineColorInput = screen.getByLabelText(/Line Color/i);
    expect(lineColorInput).toBeInTheDocument();
    expect(lineColorInput).toHaveValue('#000000');
  });

  test('renders background color input', () => {
    renderPanelWithState();
    const bgColorInput = screen.getByLabelText(/Background Color/i);
    expect(bgColorInput).toBeInTheDocument();
    expect(bgColorInput).toHaveValue('#ffffff');
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

  test('renders and toggles solution path checkbox', () => {
    renderPanelWithState();
    const checkbox = screen.getByLabelText(/Show Solution/i);
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
}); 