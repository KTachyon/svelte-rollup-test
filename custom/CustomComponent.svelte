<script lang="ts">
  import Counter from '../src/components/Counter.svelte';
  import type { CoreInterface } from '../src/core/coreInterface';

  export let name = 'default';
  export let core: CoreInterface;

  console.log(core, $$props, $$restProps);

  $: store = core.getStore();
</script>

<div>This is the custom component</div>
<div>name is {name}</div>
<div>core value is {$store.value}</div>

<Counter --color-theme-1="#ff0000" --color-bg-1="#00f0f0" />
