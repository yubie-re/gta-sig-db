<script lang="ts">
    import { AppBar } from '@skeletonlabs/skeleton';
    import { onMount } from 'svelte';
    import { DataHandler } from '@vincjo/datatables';
    import type { SignatureData, ProcessedSignature } from './+page';
    import RtmaDatatable from '$lib/RTMADatatable.svelte';
    import IntgDatatable from '$lib/INTGDatatable.svelte';
    import IconAccessibility from '~icons/mdi/github'

    let rtmaData: ProcessedSignature[] = [];
    let intgData: ProcessedSignature[] = [];

    let rtmaHandler = new DataHandler<ProcessedSignature>([], { rowsPerPage: 10 });
    rtmaHandler.sortDesc("time");
    let intgHandler = new DataHandler<ProcessedSignature>([], { rowsPerPage: 10 });
    intgHandler.sortDesc("time");

    function timeConverter(unix: number): string {
        var a = new Date(unix * 1000);
        return a.toISOString().substring(0, 10);
    }

    function flagToString(flag: number): string {
        switch (flag) {
            case 0x10:
                return "X";
            case 0x20:
                return "RX";
            case 0x40:
                return "RWX";
            case 0x80:
                return "RWXC";
            case 1:
                return "NA";
            case 2:
                return "R";
            case 4:
                return "RW";
            case 8:
                return "RC";
            default:
                return "UNK";
        }
    }

    function escapeHtml(unsafe: string): string {
        return unsafe;
    }

    onMount(async () => {
        try {
            const response = await fetch('https://raw.githubusercontent.com/yubie-re/gta-sig-db/main/sig-workflow/sig_db.json');
            const data: { RTMA: SignatureData[]; INTG: SignatureData[] } = await response.json();

            if (data.RTMA) {
                rtmaData = data.RTMA.map(dat => ({
                    firstByte: String.fromCharCode(dat.m_firstByte) + " - 0x" + dat.m_firstByte.toString(16),
                    size: dat.m_len,
                    hash: dat.m_hash,
                    pageLow: dat.m_pageLow,
                    pageHigh: dat.m_pageHigh,
                    flags: dat.m_protFlags ? flagToString(dat.m_protFlags) : undefined,
                    moduleSize: dat.m_moduleSize,
                    time: timeConverter(dat.time),
                    build: dat.build,
                    translation: dat.translation ? escapeHtml(dat.translation) : ''
                }));
                rtmaHandler.setRows(rtmaData);
            }

            if (data.INTG) {
                intgData = data.INTG.map(dat => ({
                    firstByte: String.fromCharCode(dat.m_firstByte) + " - 0x" + dat.m_firstByte.toString(16),
                    size: dat.m_len,
                    hash: dat.m_hash,
                    pageLow: dat.m_pageLow,
                    pageHigh: dat.m_pageHigh,
                    time: timeConverter(dat.time),
                    build: dat.build,
                    translation: dat.translation ? escapeHtml(dat.translation) : ''
                }));
                intgHandler.setRows(intgData);
            }
        } catch (error: any) {
            console.error('Error loading or parsing the JSON data:', error);
            alert('Failed to load JSON data: ' + error.message);
        }
    });
</script>

<svelte:head>
    <title>GTA 5 Anticheat Signature Database - View Anticheat Data & Research</title>
    <meta name="description" content="Search through GTA 5 anticheat signatures here. Big database of anticheat data dating back to 04/18/2024.">
    <meta property="og:title" content="GTA 5 Anticheat Signature Database - View Anticheat Data & Research">
    <meta property="og:description" content="Search through GTA 5 anticheat signatures here. Big database of anticheat data dating back to 04/18/2024.">
    <meta property="og:url" content="https://yubie-re.github.io/gta-sig-db/">
</svelte:head>

<AppBar>
    <svelte:fragment slot="lead">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Rockstar_Games_Logo.svg/835px-Rockstar_Games_Logo.svg.png" class="h-10 w-10" alt="Logo"/>
    </svelte:fragment>
    <h3 class="h3">GTA 5 Anticheat Signature Database</h3>
    <svelte:fragment slot="trail"><a href="https://github.com/yubie-re/gta-sig-db"><IconAccessibility class="text-2xl" href="https://github.com/yubie-re/gta-sig-db"/></a></svelte:fragment>
</AppBar>

<div class="container-xl p-6">
    <div class="container-xl pb-6">
        <div class="card p-5 bg-primary-300">
            <p>This contains all past signatures (starting 4/18/2024) added to Grand Theft Auto V's anticheat system. Translations of signature hashes are provided when possible.</p>
        </div>
    </div>

    <div class="container-xl pb-6">
        <div class="card">
            <header class="card-header">
                <h3 class="h3">Cheat Signatures</h3>
                <p>Used to detect cheats which are injected</p>
            </header>
            <div class="container-xl p-6">
                <RtmaDatatable handler={rtmaHandler}/>
            </div>
        </div>
    </div>

    <div class="container-xl pb-6">
        <div class="card">
            <header class="card-header">
                <h3 class="h3">Integrity Signatures</h3>
                <p>Used to ensure certain memory is not modified</p>
            </header>
            <div class="container-xl p-6">
                <IntgDatatable handler={intgHandler}/>
            </div>
        </div>
    </div>
</div>