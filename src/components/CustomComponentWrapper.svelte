<script lang="ts">
  import { onDestroy, type ComponentType, SvelteComponent } from 'svelte'
  import type { CoreInterface } from '../core/coreInterface'

  let component: ComponentType
  export { component as this }
  export let core: CoreInterface;

  let target: HTMLDivElement
  let cmp: SvelteComponent | null = null

  const create = () => {
    cmp = new component({
      target,
      props: { ...$$restProps, core },
    })
  }

  const cleanup = () => {
    if (!cmp) return
    cmp.$destroy()
    cmp = null
  }

  $: if (component && target) {
    cleanup()
    create()
  }

  $: if (cmp) {
    cmp.$set({ ...$$restProps, core })
  }

  onDestroy(cleanup)
</script>

<div bind:this={target} />
