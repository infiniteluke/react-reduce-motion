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
    typeof window !== "undefined" ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  );

  React.useEffect(() => {
    let mq = null;

    const handleChange = () => {
      setMatch(mq.matches);
    };


    if (typeof window !== "undefined") {
      mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      handleChange();
      mq.addEventListener('change', handleChange);
    }

    return () => {
      if (mq) {
        mq.removeEventListener('change', handleChange);
      }
    };
  }, []);

  return matches;
}
