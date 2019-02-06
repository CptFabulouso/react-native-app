// @flow
const setupModalController = () => {
	let lastlyClosed = null;
	let isOpened = false;

	return {
		setClosedTime(time: number) {
			lastlyClosed = time;
		},
		setIsOpened(opened: boolean) {
			isOpened = opened;
		},
		getClosedTime() {
			return lastlyClosed;
		},
		getIsOpened() {
			return isOpened;
		},
	};
};

const setupAlertController = () => {
	let shown = false;

	return {
		setShown(val: boolean) {
			shown = val;
		},
		isShown(): boolean {
			return shown;
		},
		onClose(): Promise<void> {
			return new Promise(res => {
				const interval = setInterval(() => {
					if (!shown) {
						clearInterval(interval);
						res();
					}
				}, 100);
			});
		},
	};
};

export const AlertController = setupAlertController();
export const ModalController = setupModalController();
