<script lang="ts">
    import type { DataHandler } from '@vincjo/datatables';
    import { get } from 'svelte/store';
    export let handler: DataHandler;
    import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';
    
    let paginationSettings : PaginationSettings = {
        page: 0,
        limit: 10,
        size: get(handler.getRowCount()).total,
        amounts: [1, 2, 5, 10, 25, 50],
    };

    handler.on("change", () => {
        paginationSettings = {
            page: 0,
            limit: paginationSettings.limit,
            size: get(handler.getRowCount()).total,
            amounts: [1, 2, 5, 10, 25, 50],
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

<section class="hidden md:block md:h-10">
    <Paginator bind:settings={paginationSettings} on:page={onPageChange} on:amount={onCountChange} showNumerals maxNumerals={1} controlVariant="variant-ghost-tertiary" active="variant-filled-primary"></Paginator>
</section>

<section class="block md:hidden">
    <Paginator bind:settings={paginationSettings} on:page={onPageChange} on:amount={onCountChange} showPreviousNextButtons={true} select="select hidden" controlVariant="variant-ghost-tertiary mt-0" active="variant-filled-primary"></Paginator>
</section>