<script>
	import ThSort from './ThSort.svelte';
	import Search from './Search.svelte';
	import RowCount from './RowCount.svelte';
	import Pagination from './Pagination.svelte';
	export let handler;
	const rows = handler.getRows();
</script>

<div class=" overflow-x-auto space-y-4">
	<header class="flex justify-between gap-4">
		<Search {handler} />
	</header>
	<table class="table table-hover table-compact w-full table-auto">
		<thead>
            <tr>
                <ThSort {handler} orderBy="firstByte">First Byte</ThSort>
                <ThSort {handler} orderBy="size">Size</ThSort>
                <ThSort {handler} orderBy="hash">Hash</ThSort>
                <ThSort {handler} orderBy="pageLow">Page Low</ThSort>
                <ThSort {handler} orderBy="pageHigh">Page High</ThSort>
                <ThSort {handler} orderBy="flags">Flags</ThSort>
                <ThSort {handler} orderBy="moduleSize">Region Size (KB)</ThSort>
                <ThSort {handler} orderBy="time">Time</ThSort>
                <ThSort {handler} orderBy="build">Build</ThSort>
                <ThSort {handler} orderBy="translation">Translation</ThSort>
            </tr>
        </thead>
        <tbody>
            {#each $rows as row}
            <tr>
                <td>{row.firstByte}</td>
                <td>{row.size}</td>
                <td>{row.hash}</td>
                <td>{row.pageLow}</td>
                <td>{row.pageHigh}</td>
                <td>{row.flags}</td>
                <td>{row.moduleSize}</td>
                <td>{row.time}</td>
                <td>{row.build}</td>
                <td><code>{row.translation}</code></td>
            </tr>
            {/each}
        </tbody>
	</table>
	<footer class="flex justify-between">
		<RowCount {handler} />
		<Pagination {handler} />
	</footer>
</div>
