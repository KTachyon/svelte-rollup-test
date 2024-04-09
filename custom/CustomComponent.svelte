<script lang="ts">
  import Counter from '../src/components/Counter.svelte';

  export let name = 'default';
</script>

<div>This is the custom component</div>
<div>name is {name}</div>

<Counter --color-theme-1="#ff0000" --color-bg-1="#00f0f0" />
