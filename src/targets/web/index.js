import React from 'react';

/* Warning if you've imported this file on React Native */
if (
  process.env.NODE_ENV !== 'production' &&
  typeof navigator !== 'undefined' &&
  navigator.product === 'ReactNative'
) {
  // eslint-disable-next-line no-console
  console.warn(
    "It looks like you've imported 'react-reduce-motion' on React Native.\n" +
      "Perhaps you're looking to import 'react-reduce-motion/native'?"
  );
}

export function useReduceMotion() {
  const [matches, setMatch] = React.useState(false);
  const mediaQuery = React.useRef();
  React.useEffect(() => {
    mediaQuery.current = window.matchMedia('(prefers-reduce-motion: reduce)');
    const handleChange = () => {
      setMatch(mediaQuery.current.matches);
    };
    handleChange();
    mediaQuery.current.addEventListener('change', handleChange);
    return () => {
      mediaQuery.current.removeEventListener('change', handleChange);
    };
  }, []);
  return matches;
}
