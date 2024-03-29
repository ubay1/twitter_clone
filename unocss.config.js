import {
	defineConfig,
	presetAttributify,
	// presetWind,
	presetMini,
	presetIcons,
	presetTypography,
	presetUno,
	presetWebFonts
	// transformerDirectives,
	// transformerVariantGroup
} from 'unocss';

import presetTheme from 'unocss-preset-theme';

export default defineConfig({
	shortcuts: [
		['w-fill', 'w-[-moz-available] w-[-webkit-fill-available]'],
		[
			'form-input',
			'bg-white px-3 rounded-md h-10 w-fill text-sm border-none focus:outline-orange-5'
		],
		[
			'btn-light',
			'bg-white p-2 h-10 text-[16px] font-default rounded-full border-none text-black border-1 border-solid border-gray-2 cursor-pointer hover:bg-gray-2 disabled:opacity-25 disabled:cursor-not-allowed'
		],
		[
			'btn-close',
			'bg-white p-2 w-10 h-10 flex justify-center items-center text-[16px] font-default rounded-full !border-none text-black border-1 border-solid border-gray-2 cursor-pointer hover:bg-gray-1 disabled:opacity-25 disabled:cursor-not-allowed'
		],
		[
			'btn-transparent',
			'bg-transparent border-none cursor-pointer p-0 hover:bg-transparent hover:opacity-80'
		]
	],
	presets: [
		presetUno({ dark: 'media' }),
		presetTheme({
			theme: {
				lampon: {
					colors: {
						colorbg: '#ffffff',
						colora: '#0f1419',
						colorb: '#536471',
						colorc: '#71767b',
						colord: '#1d9bf0',
						colore: '#1a8cd8'
					}
				},
				lampoff: {
					colors: {
						colorbg: '#000000',
						colora: '#f7f9f9',
						colorb: '#e7e9ea',
						colorc: '#71767b',
						colord: '#1d9bf0',
						colore: '#1a8cd8'
					}
				},
				tamaram: {
					colors: {
						colorbg: '#cccccc',
						colora: '#f7f9f9',
						colorb: '#e7e9ea',
						colorc: '#71767b',
						colord: '#1d9bf0',
						colore: '#1a8cd8'
					}
				}
			}
		}),
		// presetWind(),
		presetMini({
			// dark: 'class'
		}),
		presetTypography(),
		presetAttributify({
			prefix: 'un-',
			prefixedOnly: true
		}),
		presetIcons({
			warn: true
		}),
		presetWebFonts({
			provider: 'google',
			fonts: {
				default: 'Work Sans:400, 600',
				defaultBold: 'IBM Plex Sans:700',
				serif: 'Rubik:300, 600'
			}
		})
	],
	// transformers: [transformerDirectives(), transformerVariantGroup()],
	safelist: ''.split(' '),
	rules: [],
	// prettier-ignore
	theme: {
		colors: {
			colorbg: '#ffffff',
			colora: '#0f1419',
			colorb: '#536471',
			colorc: '#71767b',
			colord: '#1d9bf0',
			colore: '#1a8cd8'
		},
		boxShadow: {
			inset: 'inset 0 -1px 1px rgba(33, 71, 41, 0.15),0 0.25rem 1.5rem rgba(255, 255, 255, 0.75)'
		},
		breakpoints: {
			xxs: '320px',
			xs: '480px',
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px'
		}
	}
});
