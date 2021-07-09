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
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => {
      setMatch(mq.matches);
    };
    handleChange();
    // If only has deprecated api use that, otherwise use current api
    // Safari 14 + has both, Safari <= 13 only has deprecated
    // fixes https://github.com/infiniteluke/react-reduce-motion/issues/8
    const usesDeprecatedApi = mq.addListener && !mq.addEventListener;
    if (usesDeprecatedApi) {
      mq.addListener(handleChange);
    } else {
      mq.addEventListener('change', handleChange);
    }
    return () => {
      if (usesDeprecatedApi) {
        mq.removeListener(handleChange);
      } else {
        mq.removeEventListener('change', handleChange);
      }
    };
  }, []);
  return matches;
}
