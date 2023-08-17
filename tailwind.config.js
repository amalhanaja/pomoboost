/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			'winter',
			'night',
			{
				lightTheme: {
					primary: '#FFC056',
					secondary: '#B8F3FF',
					accent: '#09C2FF',
					'base-100': '#f5f5f4',
					info: '#52b8da',
					success: '#50d38f',
					warning: '#bc9c10',
					error: '#ed5c5a'
				}
			}
		],
		darkTheme: 'lightTheme'
	}
};
