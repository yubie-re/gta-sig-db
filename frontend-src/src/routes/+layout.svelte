<script>
	import { TypeWriter } from 'svelte-typewrite';
import '../app.css';
	import Icon from '@iconify/svelte';
</script>

<div class="p-5">
	<div class="flex flex-col items-center text-center">
		<a href="/">
			
			<h2 class="text-2xl font-bold tracking-tight">
				<TypeWriter texts={["db.yubie.dev"]} repeat = {1} endState={{ text: 'typed', caret: 'hidden' }}></TypeWriter>
			</h2>
			<h2 class="italic text-sm">
				<TypeWriter texts={["GTA V Anticheat Signature Database"]} repeat = {1} endState={{ text: 'typed', caret: 'hidden' }}></TypeWriter>
			</h2>
		</a>
		<div class = "flex space-x-2">
			<a href="https://github.com/yubie-re" class="text-2xl">
				<Icon icon="mdi:github"/>
			</a>
			<a href="https://yubie.dev" class="text-2xl">
				<Icon icon="mdi:internet"/>
			</a>
		</div>
	</div>
</div>

<div>
	<slot></slot>
</div>