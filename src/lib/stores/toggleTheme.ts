/* eslint-disable @typescript-eslint/no-explicit-any */
export function toggleTheme(preferences: any, $preferences: any) {
	preferences.set({ ...$preferences, mode: $preferences.mode });
	updateDocument($preferences.mode);
}

function updateDocument(theme: string) {
	document.documentElement.classList.add(theme);
	if (theme === 'lampon') {
		document.documentElement.classList.remove('lampoff');
		document.documentElement.classList.remove('tamaram');
	}
	if (theme === 'lampoff') {
		document.documentElement.classList.remove('lampon');
		document.documentElement.classList.remove('tamaram');
	}
	if (theme === 'tamaram') {
		document.documentElement.classList.remove('lampoff');
		document.documentElement.classList.remove('lampon');
	}
}
