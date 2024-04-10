import { store } from "../lib/store";
import type { CoreInterface } from "./coreInterface";

const getStore = () => store;

const core: CoreInterface = {
  getStore
}

export default core
