import { renderHook, act } from '@testing-library/react-hooks';

import { useReduceMotion } from './';

const mqDefaults = {
  matches: false,
  onchange: null,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
};

test('returns true if "Reduce motion" is enabled', async () => {
  window.matchMedia = jest.fn().mockImplementation(query => {
    return {
      ...mqDefaults,
      matches: true,
      media: query,
    };
  });

  const { result } = renderHook(useReduceMotion);

  expect(result.current).toBe(true);
});

test('returns false if "Reduce motion" is disabled', async () => {
  window.matchMedia = jest.fn().mockImplementation(query => {
    return {
      ...mqDefaults,
      media: query,
    };
  });

  const { result } = renderHook(useReduceMotion);

  expect(result.current).toBe(false);
});

test('handles change of "prefers-reduce-motion" media query value', async () => {
  let change;
  window.matchMedia = jest.fn().mockImplementation(query => {
    return {
      ...mqDefaults,
      matches: false,
      addEventListener(event, listener) {
        this.matches = true;
        change = listener;
      },
      media: query,
    };
  });

  const { result } = renderHook(useReduceMotion);

  expect(result.current).toBe(false);

  act(() => {
    change();
  });

  expect(result.current).toBe(true);
});
