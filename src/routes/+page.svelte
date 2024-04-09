<script lang="ts">
  import type { ComponentType } from "svelte";
  import CustomComponentWrapper from '../components/CustomComponentWrapper.svelte';
  import { loadComponent } from "../lib/customComponentLoader";
  import DefaultComponent from "../components/DefaultComponent.svelte";

  let component: ComponentType | null = null;

  const renderDefaultComponent = () => component = DefaultComponent;
  const renderCustomComponent = async () => component = await loadComponent('CustomComponent');
</script>

<button on:click={renderDefaultComponent}>Render default component</button>
<button on:click={renderCustomComponent}>Render custom component</button>

{#if component}
  <CustomComponentWrapper this={component} name={"xxx"} />
{/if}
