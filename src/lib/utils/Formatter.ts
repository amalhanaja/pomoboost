export const formateDateToYYYMMDD = (date: Date): string => {
	const yyyy = date.toLocaleDateString(undefined, { year: 'numeric' });
	const mm = date.toLocaleDateString(undefined, { month: '2-digit' });
	const dd = date.toLocaleDateString(undefined, { day: '2-digit' });
	return [yyyy, mm, dd].join('-');
};
