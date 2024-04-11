import { rollup } from 'rollup';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import svelte from 'rollup-plugin-svelte'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
// import css from 'rollup-plugin-css-only'
import terser from '@rollup/plugin-terser'
import fs from 'fs';

const build = async (componentPath) => {
  const bundle = await rollup({
    input: `custom/${componentPath}.svelte`,
    plugins: [
      svelte({
        preprocess: vitePreprocess(),
        emitCss: false,
      }),
      // emitCss && css({ output: `${componentPath}.css` }),
      resolve({
        browser: true,
        dedupe: ['svelte'],
      }),
      commonjs(),
      terser(),
    ]
  });

  await bundle.write({
    format: 'es',
    file: `public/build/custom/${componentPath}.js`,
    sourcemap: true,
  });

  await bundle.close();
}

const processCustomComponents = async () => {
  const customComponents = fs.readdirSync('custom')
    .filter((file) => file.endsWith('.svelte'))
    .map((file) => file.split('.')[0]);

  for (const componentPath of customComponents) {
    await build(componentPath);
    
    let files = [
      `public/build/custom/${componentPath}.js`,
      `public/build/custom/${componentPath}.js.map`
    ];
    let destinationPath = []

    switch (process.env.MODE) {
      case 'dev':
        destinationPath = [
          `src/customComponents/${componentPath}.js`,
          `src/customComponents/${componentPath}.js.map`
        ];
        break;
      case 'preview':
        destinationPath = [
          `.svelte-kit/output/client/_app/immutable/customComponents/${componentPath}.js`,
          `.svelte-kit/output/client/_app/immutable/customComponents/${componentPath}.js.map`
        ];
        break;
      case 'build':
        destinationPath = [
          `build/_app/immutable/customComponents/${componentPath}.js`,
          `build/_app/immutable/customComponents/${componentPath}.js.map`
        ];
        break;
    }

    for (let i = 0; i < files.length; i++) {
      fs.copyFileSync(files[i], destinationPath[i]);
    }
  }
}

processCustomComponents().then(() => {
  console.log('Custom components processed');
});
