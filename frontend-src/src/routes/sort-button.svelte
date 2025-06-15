<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import ArrowUpDownIcon from '@lucide/svelte/icons/arrow-up-down';
	import { Button } from '$lib/components/ui/button/index.js';

	interface Props extends ComponentProps<typeof Button> {
		label?: string;
	}

	let { variant = 'ghost', label ="", ...restProps }: Props = $props();
</script>

<Button {variant} {...restProps}>
  {#if label}
    <span>{label}</span>
  {/if}
	<ArrowUpDownIcon class="ml-2" />
</Button>
