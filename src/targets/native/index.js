import React from 'react';
import ReactNative from 'react-native';

export function useReduceMotion() {
  const [matches, setMatch] = React.useState(false);
  React.useEffect(() => {
    const handleChange = isReduceMotionEnabled => {
      setMatch(isReduceMotionEnabled);
    };
    ReactNative.AccessibilityInfo.isReduceMotionEnabled().then(handleChange);
    ReactNative.AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      handleChange
    );
    return () => {
      ReactNative.AccessibilityInfo.removeEventListener(
        'reduceMotionChanged',
        handleChange
      );
    };
  }, []);
  return matches;
}
