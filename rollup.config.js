const nodeResolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const json = require('rollup-plugin-json');
const { terser } = require('rollup-plugin-terser');
const sourceMaps = require('rollup-plugin-sourcemaps');

const isProduction = process.env.NODE_ENV === 'production';

const globals = { react: 'React', 'react-native': 'ReactNative' };

const cjs = {
  format: 'cjs',
  sourcemap: true,
};

const esm = {
  format: 'esm',
  sourcemap: true,
};

const getCJS = override => ({ ...cjs, ...override });
const getESM = override => ({ ...esm, ...override });

const commonPlugins = [
  sourceMaps(),
  json(),
  nodeResolve(),
  babel({
    exclude: ['node_modules/**', '../../node_modules/**'],
  }),
  commonjs({
    namedExports: {
      'react-is': ['isElement', 'isValidElementType', 'ForwardRef'],
    },
  })
];

const standaloneBaseConfig = {
  input: './src/targets/web/index.js',
  output: {
    file: 'dist/react-reduce-motion.js',
    format: 'umd',
    globals,
    name: 'react-reduce-motion',
    sourcemap: true,
  },
  external: Object.keys(globals),
  plugins: commonPlugins,
};

const standaloneConfig = {
  ...standaloneBaseConfig,
  plugins: standaloneBaseConfig.plugins.concat(
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    })
  ),
};

const prodPlugins = [
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  terser({
    sourcemap: true,
  }),
];


const standaloneProdConfig = {
  ...standaloneBaseConfig,
  output: {
    ...standaloneBaseConfig.output,
    file: 'dist/react-reduce-motion.min.js',
  },
  plugins: standaloneBaseConfig.plugins.concat(prodPlugins),
};

const browserConfig = {
  input: './src/targets/web/index.js',
  output: [
    getESM({ file: 'dist/react-reduce-motion.browser.esm.js' }),
    getCJS({ file: 'dist/react-reduce-motion.browser.cjs.js' }),
  ],
  external: Object.keys(globals),
  plugins: commonPlugins,
};

const nativeConfig = {
  input: './src/targets/native/index.js',
  output: [
    getCJS({
      file: 'native/dist/react-reduce-motion.native.cjs.js',
    }),
    getESM({
      file: 'native/dist/react-reduce-motion.native.esm.js',
    }),
  ],
  external: Object.keys(globals),
  plugins: commonPlugins,
};


export default [
  standaloneConfig,
  standaloneProdConfig,
  browserConfig,
  nativeConfig,
];