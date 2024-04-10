export interface CoreInterface {
  getStore: () => typeof import("../lib/store").store;
}
