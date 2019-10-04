# React Reduce Motion ➰

## Installation and Usage
React Reduce Motion requires react `^16.8.0` or for native, requires react-native `^0.60`

```sh
yarn add react-reduce-motion
```

React Reduce Motion exposes a [react hook](https://reactjs.org/docs/hooks-intro.html) that exposes the "Reduce Motion" preference of a user's operating system to your code.

```js
import { useReduceMotion } from 'react-reduce-motion';
```

## Why?

Building animations in React are fun! Especially if you're using a library like [react-spring](). But, they're not fun for everyone. 

Vestibular dysfunction, a balance disorder of the inner ear, is surprisingly common among US adults. [A study](https://www.ncbi.nlm.nih.gov/pubmed/19468085) from the early 2000's found that approximately 69 million Americans had vestibular dysfunction which results in vertigo, nausea, migraines and hearing loss. Many people affected by vestibular dysfunction will choose to set the "Reduce motion" setting in their OS. In macOS it's found in the accessibility settings.

![A macOS system preferences screen with the "Reduce motion" checkbox checked](https://lukeherrington.com/static/56a2a145993311eb80344c1b9845f23f/884f2/reduce-motion-macos.png)

If you're including animations in your app, consider optionally reducing their intensity so that _everyone_ can enjoy your app. There are a couple ways you can do this with React Reduce Motion.

1. If you're using `react-spring`, disable animations entirely using a global:

```js
import { Globals } from 'react-spring'
import { useReduceMotion } from 'react-reduce-motion';

const MyApp = () => {
  const prefersReducedMotion = useReduceMotion()
  React.useEffect(() => {
    Globals.assign({
      skipAnimation: prefersReducedMotion,
    })
  }, [prefersReducedMotion])
  return ...
}
```

2. Reduce the animation intensity using a heuristic of your choosing:

```js
import { useReduceMotion } from 'react-reduce-motion';

function ParallaxAnimatedButton({ rotation = 10, scale = 1.2 }) {
  const buttonRef = React.useRef();
  const reduceMotion = useReduceMotion();
  const defaultTransform = [0, 0, 1]
  // This is where we choose the animation intensity depending on user preference.
  const actualRotation = reduceMotion ? rotation / 3 : rotation;
  const actualScale = reduceMotion ? 1.01 : scale;
  const [props, set] = useSpring(() => ({
    xys: defaultTransform,
    config: { mass: 7, tension: 500, friction: 40 }
  }));
  return (
    <animated.button
      ref={buttonRef}
      onMouseMove={({ clientX, clientY }) =>
        set({ xys: calc(actualRotation, actualScale, clientX, clientY, buttonRef.current) })
      }
      onMouseLeave={() => set({ xys: defaultTransform })}
      style={{
        transform: props.xys.to(transform),
      }}
    >
      Hover over me!
    </animated.button>
  );
}
```

Before:
![A very intensely animated button](https://user-images.githubusercontent.com/1127238/66233346-fa988980-e69f-11e9-89af-e7db47549293.gif)

After:
![A subtly animated button](https://user-images.githubusercontent.com/1127238/66233366-071ce200-e6a0-11e9-87f6-42b850e18a6e.gif)

```js
  const actualRotation = reduceMotion ? rotation / 3 : rotation;
```

The above snippet is where the heuristic is applied. Depending on what you're animating, you need to make your own decision. See the [Resources](#Resources) section below as your guide.

## Native

To use React Reduce Motion with React Native, import the `native` build use the hook as demonstrated above.

```js
import { useReduceMotion } from 'react-reduce-motion/native';
```

## Implementation

The web version of this package is based on `prefers-reduced-motion` from Media Queries Level 5. See browser support [here](https://caniuse.com/#feat=prefers-reduced-motion).

The native version depends on React Native's [AccessibilityInfo API](https://facebook.github.io/react-native/docs/accessibilityinfo) which provides a cross platform `isReduceMotionEnabled` function. This was introduced in React Native `v0.60`.

## Inspiration

Writing a blog post about my experience learning `react-spring` helped me realize a dedicated package was needed for this purpose. [Read it here](https://lukeherrington.com/posts/springtime-in-react-town/) and you'll learn how I implemented it. [A conversation with Paul, the creator of react-spring](https://github.com/react-spring/react-spring/issues/811) spurred me to contribute this work. 

## Resources

### [WCAG 2.1 - Guideline 2.3 Seizures and Physical Reactions](https://www.w3.org/TR/WCAG21/#seizures-and-physical-reactions)
> Do not design content in a way that is known to cause seizures or physical reactions. <sub>[reference](https://www.w3.org/TR/WCAG21/#seizures-and-physical-reactions)</sub>

> Motion animation triggered by interaction can be disabled, unless the animation is _[essential](https://www.w3.org/TR/WCAG21/#dfn-essential)_ [emphasis added] to the functionality or the information being conveyed. <sub>[reference](https://www.w3.org/TR/WCAG21/#animation-from-interactions)</sub>

