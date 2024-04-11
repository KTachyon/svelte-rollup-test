import { rollup } from 'rollup';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import svelte from 'rollup-plugin-svelte'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
// import css from 'rollup-plugin-css-only'
import terser from '@rollup/plugin-terser'
import fs from 'fs';
import { v4 } from 'uuid';

const build = async (componentPath, identifier) => {
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
    file: `public/build/custom/${componentPath}-${identifier}.js`,
    sourcemap: true,
  });

  await bundle.close();
}

const processCustomComponents = async (identifier) => {
  const customComponents = fs.readdirSync('custom')
    .filter((file) => file.endsWith('.svelte'))
    .map((file) => file.split('.')[0]);

  let destinationPath = '';

  switch (process.env.MODE) {
    case 'dev':
      destinationPath = 'src/customComponents/';
      break;
    case 'preview':
      destinationPath = '.svelte-kit/output/client/_app/immutable/customComponents/';
      break;
    case 'build':
      destinationPath = 'build/_app/immutable/customComponents/';
      break;
  }

  for (const componentPath of customComponents) {
    await build(componentPath, identifier);

    const pathIdentifier = `${componentPath}-${identifier}`;
    
    let files = [
      `public/build/custom/${pathIdentifier}.js`,
      `public/build/custom/${pathIdentifier}.js.map`
    ];

    for (let i = 0; i < files.length; i++) {
      fs.copyFileSync(files[i], `${destinationPath}${files[i].split('/').pop()}`);
    }
  }

  fs.writeFileSync(
    `${destinationPath}map.json`,
    JSON.stringify(
      customComponents.reduce((acc, component) => {
        acc[component] = `${component}-${identifier}`;
        return acc;
      }, {})
    )
  );
}

processCustomComponents(v4()).then(() => {
  console.log('Custom components processed');
});
