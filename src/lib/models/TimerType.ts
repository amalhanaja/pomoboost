export const timerTypes = ["POMODORO", "SHORT_BREAK", "LONG_BREAK"] as const;
type TimerType = (typeof timerTypes)[number];
export default TimerType;