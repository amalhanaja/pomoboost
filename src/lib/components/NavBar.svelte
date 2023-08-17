<script lang="ts">
	import IcSetting from './Icons/IcSetting.svelte';
	export let onSettingClick: () => void;
</script>

<nav class="navbar bg-primary">
	<div class="text-primary-content flex-1">
		<a class="btn btn-ghost normal-case text-xl" href="/"
			><img class=" w-8 h-8" src="/app_icon.svg" alt="logo" />PomoBoost</a
		>
	</div>
	<div class="flex-none">
		<button
			class="btn btn-square text-primary-content btn-ghost"
			on:click|preventDefault={onSettingClick}
			aria-label="Settings"
		>
			<IcSetting />
		</button>
	</div>
</nav>
