<script lang="ts">
	import { fade } from 'svelte/transition';
	import * as Select from '$lib/components/ui/select';

	import type { PageProps } from './$types';
	import { rtmaColumns } from './rtma-columns';
	import { intgColumns } from './intg-columns';
	import RtmaDataTable from './data-table.svelte';

	let { data }: PageProps = $props();

	let selectedPlatform = $state('pcrosalt');
	let selectedType = $state('rtma');
</script>

<svelte:head>
	<title>GTA5 Anticheat DB</title>
	<meta name="title" content="GTA 5 Anticheat Database" />
	<meta name="description" content="Analyze Grand Theft Auto V's Anticheat!" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://db.yubie.dev/" />
	<meta property="og:title" content="Yubie-re's blog" />
	<meta property="og:description" content="Analyze Grand Theft Auto V's Anticheat!" />
	<meta property="og:image" content="https://db.yubie.dev/meta/og.png" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://db.yubie.dev/" />
	<meta property="twitter:title" content="GTA 5 Anticheat Database" />
	<meta property="twitter:description" content="Analyze Grand Theft Auto V's Anticheat!" />
	<meta property="twitter:image" content="https://db.yubie.dev/meta/og.png" />
</svelte:head>

<div class="space-y-6">
	<!-- Navigation Selector -->
	<div class="flex flex-col items-center space-y-2 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-3">
		<div class="flex items-center space-x-1">
			<span class="text-sm font-medium">Platform:</span>
			<Select.Root type="single" bind:value={selectedPlatform}>
				<Select.Trigger class="w-[180px]">
                    {selectedPlatform === 'pcrosalt' ? 'Enhanced' : 'Legacy'}
                </Select.Trigger>
				<Select.Content>
					<Select.Item value="pcrosalt">Enhanced</Select.Item>
					<Select.Item value="pcros">Legacy</Select.Item>
				</Select.Content>
			</Select.Root>
		</div>

        <div class="flex items-center space-x-1">
			<span class="text-sm font-medium">Type:</span>
			<Select.Root type="single" bind:value={selectedType}>
				<Select.Trigger class="w-[180px]">
                    {selectedType === 'rtma' ? 'Cheat' : 'Integrity'}
                </Select.Trigger>
				<Select.Content>
					<Select.Item value="rtma">Cheat</Select.Item>
					<Select.Item value="intg">Integrity</Select.Item>
				</Select.Content>
			</Select.Root>
		</div>
	</div>
	{#key selectedType}
		<div transition:fade={{ duration: 300 }}>
			<RtmaDataTable
				data={
					selectedType === 'rtma'
						? (selectedPlatform === 'pcrosalt' ? data.pcrosalt.rtmaData : data.pcros.rtmaData)
						: (selectedPlatform === 'pcrosalt' ? data.pcrosalt.intgData : data.pcros.intgData)
				}
				columns={selectedType === 'rtma' ? rtmaColumns : intgColumns}
			/>
		</div>
	{/key}
</div>
