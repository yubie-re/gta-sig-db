<script lang="ts">
	import type { DataHandler } from '@vincjo/datatables';
	export let handler: DataHandler;
	let value: string;
</script>

<input
	class="input w-full sm:w-64 py-2 px-3"
	type="search"
	placeholder="Search..."
	bind:value
	on:input={() => handler.search(value)}
/>