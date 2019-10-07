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
  const [matches, setMatch] = React.useState(
    window.matchMedia('(prefers-reduced-motion: reduce)')
  );
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => {
      setMatch(mq.matches);
    };
    handleChange();
    mq.addEventListener('change', handleChange);
    return () => {
      mq.removeEventListener('change', handleChange);
    };
  }, []);
  return matches;
}
