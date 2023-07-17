<script lang="ts">
	export let seconds: number;
	$: remainingMinutes = Math.floor(seconds / 60);
	$: remainingSeconds = seconds - remainingMinutes * 60;
</script>

<section class="card w-96 bg-base-200 py-10">
	<div class="card-body items-center text-center">
		<span class="countdown font-mono text-6xl">
			<span style={`--value: ${remainingMinutes}`} />:
			<span style={`--value: ${remainingSeconds}`} />
		</span>
	</div>
</section>
