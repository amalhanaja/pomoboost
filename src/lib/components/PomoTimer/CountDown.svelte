<script lang="ts">
	export let seconds: number;
	export let minutes: number;
	export let count: number;
</script>

<section class="card w-full py-10 bg-white dark:bg-stone-900 shadow-sm">
	<div class="card-body items-center text-center">
		<div class="countdown font-bold font-mono text-6xl text-primary">
			<span style={`--value: ${minutes}`} />:
			<span style={`--value: ${seconds}`} />
		</div>
		<div class="text-lg absolute bottom-5 font-medium text-base-content">#{count}</div>
	</div>
</section>
