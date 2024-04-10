<script lang="ts">
  import Counter from './Counter.svelte';
  import { store } from '../lib/store';
</script>

<div>This is the default component</div>
<div>core value is {$store.value}</div>

<Counter --color-theme-1="#0000ff" --color-bg-1="#f0f000" />
