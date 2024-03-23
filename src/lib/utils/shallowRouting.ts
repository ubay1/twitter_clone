import { goto, preloadData, pushState } from '$app/navigation';

export class ShallowRouting {
	public static _path: string;

	get path(): string {
		return ShallowRouting._path;
	}
	set path(val: string) {
		ShallowRouting._path = val;
	}

	static async showModal() {
		const result = await preloadData(ShallowRouting._path);

		if (result.type === 'loaded' && result.status === 200) {
			document.body.style.overflow = 'hidden';
			pushState(ShallowRouting._path, { showModal: true });
		} else {
			goto(ShallowRouting._path);
		}
	}

	static closeModalByHistory() {
		document.body.style.overflow = 'visible';
		history.back();
	}
	static closeModalByReplace() {
		document.body.style.overflow = 'visible';
		goto('/');
	}
}

type TypeCloseModal = {
	type: 'history_back' | 'replace_back';
};

interface ICloseModal {
	back(options: TypeCloseModal): void;
}

export class CloseShallowRouting implements ICloseModal {
	back(options: TypeCloseModal) {
		if (options.type === 'history_back') {
			ShallowRouting.closeModalByHistory();
		} else {
			ShallowRouting.closeModalByReplace();
		}
	}
}
