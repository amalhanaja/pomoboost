/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
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
				},
				darkTheme: {
					primary: '#FFC056',
					secondary: '#B8F3FF',
					accent: '#09C2FF',
					neutral: '#f5f5f4',
					'base-100': '#292524',
					info: '#52b8da',
					success: '#50d38f',
					warning: '#bc9c10',
					error: '#ed5c5a'
				}
			}
		],
		darkTheme: 'darkTheme'
	}
};
