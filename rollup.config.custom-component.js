import svelte from 'rollup-plugin-svelte'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import css from 'rollup-plugin-css-only'
import terser from '@rollup/plugin-terser'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const componentPath = process.env.COMPONENT_PATH

// include CSS in component's JS for ease of use
//
// set to true to get separate CSS for the component (but then,
// you'll need to inject it yourself at runtime somehow)
//
const emitCss = false

export default {
  // our widget as input
  input: `custom/${componentPath}.svelte`,

  output: {
    format: 'es',
    file: `public/build/custom/${componentPath}.js`,
    sourcemap: true, // TODO: We would probably want to get this into bugsnag
  },

  // usual plugins for Svelte... customize as needed
  plugins: [
    svelte({
      preprocess: vitePreprocess(),
      emitCss,
    }),

    emitCss && css({ output: `${componentPath}.css` }),

    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    commonjs(),
    terser(),
  ],
}