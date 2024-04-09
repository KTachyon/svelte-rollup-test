## Added dependencies on top of the svelte skeleton

@rollup/plugin-commonjs
@rollup/plugin-node-resolve
@rollup/plugin-terser
@types/rollup-plugin-css-only
rollup
rollup-plugin-css-only
rollup-plugin-svelte

## Running

Currently:

```
COMPONENT_PATH=CustomComponent npx rollup --config rollup.config.custom-component.js
cp public/build/custom/CustomComponent.js src/customComponents
```

WIP: still need to push to the server to test

## src/customComponents

This folder was kept on purpose. Should be the place where we add custom components. Should support having a directory tree just fine.

## Basic idea

Have some configuration file where we have the custom components to replace existing components. We could pre-load those or just fetch when needed, as they are separate files. We would need to have logic for each replaceable component to get the actual component.

The component fetching uses a dictionary, we shouldn't fetch the same path twice (it will crash otherwise).
