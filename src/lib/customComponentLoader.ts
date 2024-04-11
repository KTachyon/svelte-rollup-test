import type { ComponentType } from "svelte";

let componentMap: { [key: string]: string } | null = null;
const loadedComponentMap: { [key: string]: ComponentType } = {}

export const loadComponent = async (componentPath: string): Promise<ComponentType> => {
  if (!componentMap) {
    componentMap = (await import(/* @vite-ignore */ `../customComponents/map.json`)).default;
  }

  if (!loadedComponentMap[componentPath] && componentMap) {
    loadedComponentMap[componentPath] = (await import(/* @vite-ignore */ `../customComponents/${componentMap[componentPath]}.js`)).default;
  }

  return loadedComponentMap[componentPath];
}
