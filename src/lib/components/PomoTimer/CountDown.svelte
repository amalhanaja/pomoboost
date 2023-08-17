<script lang="ts">
	export let seconds: number;
	export let minutes: number;
	export let count: number;
</script>

<section class="card w-full bg-base-200 py-10">
	<div class="card-body items-center text-center">
		<div class="countdown font-bold font-mono text-6xl text-primary">
			<span style={`--value: ${minutes}`} />:
			<span style={`--value: ${seconds}`} />
		</div>
		<div class="text-lg absolute bottom-5 font-medium text-base-content">#{count}</div>
	</div>
</section>
