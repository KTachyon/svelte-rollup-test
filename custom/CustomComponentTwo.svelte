<script lang="ts">
  import Counter from '../src/components/Counter.svelte';
  import type { CoreInterface } from '../src/core/coreInterface';

  export let name = 'default';
  export let core: CoreInterface;

  const { getStore } = core;

  $: store = getStore();
</script>

<div>This is the custom two component</div>
<div>name is {name}</div>
<div>core value is {$store.value}</div>

<Counter --color-theme-1="#ff00ff" --color-bg-1="#f0f0f0" />
