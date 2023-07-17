<script lang="ts">
	export let seconds: number;
	export let minutes: number;
</script>

<section class="card w-96 bg-base-200 py-10">
	<div class="card-body items-center text-center">
		<span class="countdown font-mono text-6xl">
			<span style={`--value: ${minutes}`} />:
			<span style={`--value: ${seconds}`} />
		</span>
	</div>
</section>
