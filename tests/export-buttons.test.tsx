/* eslint-env jest */
import { afterEach, beforeEach, describe, expect, jest, test } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import ExportButtons from '../components/ExportButtons';

// Helper to create a minimal SVG element for testing
function createMockSvg(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  // Add a dummy rect so serializer has something to work with
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('width', '10');
  rect.setAttribute('height', '10');
  svg.appendChild(rect);
  return svg as SVGSVGElement;
}

describe('ExportButtons component', () => {
  let originalCreateObjectURL: typeof URL.createObjectURL;
  let originalRevokeObjectURL: (typeof URL)['revokeObjectURL'];
  let createObjectURLMock: ReturnType<typeof jest.fn>;

  beforeEach(() => {
    // Mock URL.createObjectURL so that calls succeed without browser blob support
    originalCreateObjectURL = URL.createObjectURL;
    originalRevokeObjectURL = URL.revokeObjectURL;
    createObjectURLMock = jest.fn(() => 'blob:url');
    // @ts-ignore
    URL.createObjectURL = createObjectURLMock;
    // @ts-ignore
    URL.revokeObjectURL = jest.fn();
  });

  afterEach(() => {
    // Restore mocks
    URL.createObjectURL = originalCreateObjectURL;
    URL.revokeObjectURL = originalRevokeObjectURL;
    jest.restoreAllMocks();
  });

  test('exports SVG on button click', () => {
    const svgElement = createMockSvg();
    const svgRef = { current: svgElement } as React.RefObject<SVGSVGElement>;

    const origCreateElement = document.createElement.bind(document);
    let anchorClicked = false;
    jest.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      const el = origCreateElement(tag);
      if (tag === 'a') {
        (el as HTMLAnchorElement).click = () => { anchorClicked = true; };
      }
      return el;
    });

    render(<ExportButtons svgRef={svgRef} />);
    const svgBtn = screen.getByRole('button', { name: /Export SVG/i });
    fireEvent.click(svgBtn);

    // Expect URL.createObjectURL to have been called, indicating export logic executed
    expect(createObjectURLMock).toHaveBeenCalledTimes(1);
    expect(anchorClicked).toBe(true);
  });

  test('opens print dialog on Print button click', () => {
    const svgElement = createMockSvg();
    const svgRef = { current: svgElement } as React.RefObject<SVGSVGElement>;

    const openMock = jest.fn(() => ({
      document: {
        write: jest.fn(),
        close: jest.fn(),
      },
      focus: jest.fn(),
      print: jest.fn(),
      close: jest.fn(),
    }));
    // @ts-ignore
    jest.spyOn(window, 'open').mockImplementation(openMock);

    render(<ExportButtons svgRef={svgRef} />);
    const printBtn = screen.getByRole('button', { name: /Print/i });
    fireEvent.click(printBtn);

    expect(openMock).toHaveBeenCalled();
  });
}); 