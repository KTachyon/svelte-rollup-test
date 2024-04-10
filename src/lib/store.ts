import { writable } from "svelte/store";

export function initStore() {
  const store = writable<{ value: string }>();
  store.set({ value: "" });
  return store;
}

export const store = initStore();
