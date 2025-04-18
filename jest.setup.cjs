require('@testing-library/jest-dom');

// Polyfill ResizeObserver for Jest
class ResizeObserver {
  constructor(callback) { this.callback = callback; }
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;
