<script lang="ts">
  import type { ComponentType } from "svelte";
  import CustomComponentWrapper from '../components/CustomComponentWrapper.svelte';
  import { loadComponent } from "../lib/customComponentLoader";
  import DefaultComponent from "../components/DefaultComponent.svelte";
  import { store } from "../lib/store";
  import core from "../core/core";

  function makeid(length: number = 5) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
 }

  let component: ComponentType | null = null;

  const renderDefaultComponent = () => component = DefaultComponent;
  const renderCustomComponent = async () => component = await loadComponent('CustomComponent');

  setInterval(() => {
    $store.value = makeid();
  }, 1000);
</script>

<button on:click={renderDefaultComponent}>Render default component</button>
<button on:click={renderCustomComponent}>Render custom component</button>

{#if component}
  <CustomComponentWrapper this={component} name={"xxx"} {core} />
{/if}
