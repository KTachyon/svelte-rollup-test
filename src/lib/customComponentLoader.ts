import type { ComponentType } from "svelte";

const loadedComponentMap: { [key: string]: ComponentType } = {}

export const loadComponent = async (componentPath: string): Promise<ComponentType> => {
  if (!loadedComponentMap[componentPath]) {
    loadedComponentMap[componentPath] = (await import(/* @vite-ignore */ `../customComponents/${componentPath}.js`)).default;
  }

  return loadedComponentMap[componentPath];
}
