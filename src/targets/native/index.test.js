jest.mock('react-native', () => ({
  AccessibilityInfo: {
    isReduceMotionEnabled: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  },
}));
import { renderHook } from '@testing-library/react-hooks';
import { AccessibilityInfo } from 'react-native';

import { useReduceMotion } from './';

test('returns true if "Reduce motion" is enabled', async () => {
  AccessibilityInfo.isReduceMotionEnabled.mockResolvedValue(true);
  const { result, waitForNextUpdate } = renderHook(() => useReduceMotion());
  expect(result.current).toBe(false);
  await waitForNextUpdate();
  expect(result.current).toBe(true);
});

test('returns false if "Reduce motion" is disabled', async () => {
  AccessibilityInfo.isReduceMotionEnabled.mockResolvedValue(false);
  const { result } = renderHook(() => useReduceMotion());
  expect(result.current).toBe(false);
});
