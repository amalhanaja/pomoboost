<script lang="ts">
	import type TimerState from '$lib/models/CountDownState';
	import type PomoTimerModel from '$lib/models/PomoTimerModel';
	import type TimerSettingsModel from '$lib/models/TimerSettingsModel';
	import type TimerType from '$lib/models/TimerType';
	import getSettingDuration from '$lib/utils/getSettingDuration';
	import { get, writable, type Writable } from 'svelte/store';
	import CountDown from './CountDown.svelte';
	import TimerActions from './TimerActions.svelte';
	import TimerTypeTabs from './TimerTypeTabs.svelte';
	import pingAudio from '$lib/assets/audios/ping.mp3';
	import alarmClockShortAudio from '$lib/assets/audios/alarm-clock-short.mp3';
	export let settings: TimerSettingsModel;
	export let pomoTimerStore: Writable<PomoTimerModel>;
	export let pomodoroCountStore: Writable<Map<TimerType, number>>;
	const longBreakInterval = 3;
	const timerState = writable<TimerState>('STOPPED');
	let interval: NodeJS.Timer | undefined = undefined;

	const changeTimerType = (timerType: TimerType) => {
		pomoTimerStore.update((prev) => ({ ...prev, timerType: timerType }));
	};

	const onTick = () => {
		const updated = get(pomoTimerStore).seconds - 1;
		pomoTimerStore.update((prev) => ({ ...prev, seconds: updated }));
		if (updated <= 0) {
			finish();
		}
	};

	const getNextTimerType = (current: TimerType): TimerType => {
		const isPomodoro = current === 'POMODORO';
		const pomodoroCount = get(pomodoroCountStore).get('POMODORO') ?? 0;
		const shouldTakeLongBreak = pomodoroCount > 0 && pomodoroCount % longBreakInterval === 0;
		return !isPomodoro ? 'POMODORO' : shouldTakeLongBreak ? 'LONG_BREAK' : 'SHORT_BREAK';
	};

	const playAudio = (src: string) => {
		const audio = new Audio(src);
		audio.loop = false;
		audio.play();
	};

	const start = () => {
		playAudio(pingAudio);
		timerState.set('RUNNING');
		interval = setInterval(onTick, 1000);
	};

	const stop = () => {
		timerState.set('STOPPED');
		clearInterval(interval);
	};

	const updateCount = (current: TimerType) => {
		pomodoroCountStore.update((prev) => {
			const count = (prev.get(current) ?? 0) + 1;
			prev.set(current, count);
			return prev;
		});
	};

	const next = () => {
		const current = get(pomoTimerStore).timerType;
		updateCount(current);
		const nextTimerType = getNextTimerType(current);
		console.log(nextTimerType);
		changeTimerType(nextTimerType);
	};

	const finish = () => {
		playAudio(alarmClockShortAudio);
		timerState.set('COMPLETED');
		clearInterval(interval);
		next();
	};

	const onClickMainControl = () => {
		if ($timerState === 'RUNNING') {
			stop();
			return;
		}
		if ($pomoTimerStore?.seconds <= 0) {
			return;
		}
		start();
	};

	const onClickReset = () => {
		stop();
		pomoTimerStore.update((prev) => ({
			...prev,
			seconds: getSettingDuration(settings, prev.timerType)
		}));
	};

	const onClickSkip = () => {
		stop();
		next();
	};
</script>

<section class="flex flex-col gap-y-8 w-96 m-auto">
	<TimerTypeTabs selected={$pomoTimerStore?.timerType ?? 'POMODORO'} onSelect={changeTimerType} />
	<CountDown seconds={$pomoTimerStore?.seconds ?? 0} />
	<TimerActions
		isRunning={$timerState === 'RUNNING'}
		{onClickMainControl}
		{onClickReset}
		{onClickSkip}
	/>
</section>
