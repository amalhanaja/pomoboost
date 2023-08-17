<script lang="ts">
	import alarmClockShortAudio from '$lib/assets/audios/alarm-clock-short.mp3';
	import pingAudio from '$lib/assets/audios/ping.mp3';
	import type TimerState from '$lib/models/CountDownState';
	import type NotificationSettingsModel from '$lib/models/NotificationSettingsModel';
	import type PomoTimerModel from '$lib/models/PomoTimerModel';
	import type TimerSettingsModel from '$lib/models/TimerSettingsModel';
	import type TimerType from '$lib/models/TimerType';
	import getSettingDuration from '$lib/utils/getSettingDuration';
	import { get, type Writable } from 'svelte/store';
	import CountDown from './CountDown.svelte';
	import TimerActions from './TimerActions.svelte';
	import TimerTypeTabs from './TimerTypeTabs.svelte';
	import { notify } from '$lib/utils/notification';
	export let timerSettings: TimerSettingsModel;
	export let notificationSettings: NotificationSettingsModel;
	export let pomoTimerStore: Writable<PomoTimerModel>;
	export let pomodoroCountStore: Writable<Map<TimerType, number>>;
	export let onStateChanged: (newState: TimerState) => void;
	const LONG_BREAK_INTERVAL = 3;
	let timerState: TimerState = 'STOPPED';
	$: minutes = Math.floor(($pomoTimerStore?.seconds ?? 0) / 60);
	$: seconds = ($pomoTimerStore?.seconds ?? 0) - minutes * 60;
	$: count = $pomodoroCountStore?.get($pomoTimerStore?.timerType) ?? 1;
	$: headerTitle =
		timerState === 'RUNNING'
			? `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} – PomoBoost`
			: 'PomoBoost';
	let interval: NodeJS.Timer | undefined = undefined;

	const changeTimerType = (timerType: TimerType) => {
		pomoTimerStore.update((prev) => ({ ...prev, timerType: timerType }));
	};

	const changeTimerState = (newState: TimerState) => {
		timerState = newState;
		onStateChanged(newState);
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
		const shouldTakeLongBreak = pomodoroCount > 0 && pomodoroCount % LONG_BREAK_INTERVAL === 0;
		return !isPomodoro ? 'POMODORO' : shouldTakeLongBreak ? 'LONG_BREAK' : 'SHORT_BREAK';
	};

	const playAudio = (src: string) => {
		const audio = new Audio(src);
		audio.loop = false;
		audio.volume = notificationSettings.volume;
		audio.play();
	};

	const start = () => {
		playAudio(pingAudio);
		changeTimerState('RUNNING');
		interval = setInterval(onTick, 1000);
	};

	const stop = () => {
		changeTimerState('STOPPED');
		clearInterval(interval);
	};

	const updateCount = (current: TimerType) => {
		pomodoroCountStore.update((prev) => {
			const count = (prev.get(current) ?? 0) + 1;
			prev.set(current, count);
			return prev;
		});
	};

	const next = (): TimerType => {
		const current = get(pomoTimerStore).timerType;
		updateCount(current);
		const nextTimerType = getNextTimerType(current);
		changeTimerType(nextTimerType);
		return nextTimerType;
	};

	const finish = () => {
		const current = get(pomoTimerStore).timerType;
		notify(`${current} COMPLETED`);
		playAudio(alarmClockShortAudio);
		changeTimerState('COMPLETED');
		clearInterval(interval);
		const nextTimerType = next();
		const isNextRoundPomodoro = nextTimerType === 'POMODORO';
		if (isNextRoundPomodoro && timerSettings.autoStartPomodoros) {
			start();
			return;
		}
		if (!isNextRoundPomodoro && timerSettings.autoStartBreaks) {
			start();
		}
	};

	const onClickMainControl = () => {
		if (timerState === 'RUNNING') {
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
			seconds: getSettingDuration(timerSettings, prev.timerType)
		}));
	};

	const onClickSkip = () => {
		stop();
		next();
	};
</script>

<svelte:head>
	<title>{headerTitle}</title>
</svelte:head>
<section class="flex flex-col w-full sm:w-96 mx-4 gap-y-8 m-auto sm:m-auto">
	<TimerTypeTabs selected={$pomoTimerStore?.timerType ?? 'POMODORO'} onSelect={changeTimerType} />
	<CountDown {seconds} {minutes} {count} />
	<TimerActions
		isRunning={timerState === 'RUNNING'}
		{onClickMainControl}
		{onClickReset}
		{onClickSkip}
	/>
</section>
