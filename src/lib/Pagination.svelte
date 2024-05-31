<script lang="ts">
	import type { DataHandler } from '@vincjo/datatables';
    import { get } from 'svelte/store';
	export let handler: DataHandler;
    import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';
    let paginationSettings : PaginationSettings = {
        page: 0,
        limit: 10,
        size: get(handler.getRowCount()).total,
        amounts: [1,2,5,10, 25, 50],
    };

    handler.on("change", ()=>{
        paginationSettings = {
            page: 0,
            limit: paginationSettings.limit,
            size: get(handler.getRowCount()).total,
            amounts: [1,2,5,10, 25, 50],
        };
    });

    function onPageChange(e: CustomEvent<number>): void {
        handler.setPage(e.detail + 1);
        console.log(e.detail);
        paginationSettings.page = e.detail;
    }

    function onCountChange(e: CustomEvent<number>): void {
        handler.getRowsPerPage().set(e.detail);
        paginationSettings.page = 0;
        paginationSettings.limit = e.detail;
    }
</script>

<section class=" h-10 hidden lg:block">
    <Paginator bind:settings={paginationSettings} on:page={onPageChange} on:amount={onCountChange} showNumerals maxNumerals={1} controlVariant="variant-ghost-tertiary" active="variant-filled-primary"></Paginator>
</section>
