import type TimerSettingsModel from '$lib/models/TimerSettingsModel';
import type TimerType from '$lib/models/TimerType';

const getSettingDuration = (settings: TimerSettingsModel, timerType: TimerType): number => {
	switch (timerType) {
		case 'POMODORO':
			return settings.pomodoroDuration;
		case 'SHORT_BREAK':
			return settings.shortBreakDuration;
		case 'LONG_BREAK':
			return settings.longBreakDuration;
	}
};

export default getSettingDuration;
