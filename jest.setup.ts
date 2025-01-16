import '@testing-library/jest-dom';

// Mock do localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
  length: 0,
  key: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock do console.log e console.error para testes mais limpos
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
};

// Limpa todos os mocks após cada teste
afterEach(() => {
  jest.clearAllMocks();
});