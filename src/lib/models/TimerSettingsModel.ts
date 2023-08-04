type TimerSettingsModel = {
	pomodoroDuration: number;
	shortBreakDuration: number;
	longBreakDuration: number;
	autoStartPomodoros: boolean;
	autoStartBreaks: boolean;
	longBreakInterval: number;
};

export const DefaultTimerSettings: TimerSettingsModel = {
	pomodoroDuration: 25 * 60,
	shortBreakDuration: 5 * 60,
	longBreakDuration: 15 * 60,
	autoStartPomodoros: false,
	autoStartBreaks: true,
	longBreakInterval: 3
};

export default TimerSettingsModel;
