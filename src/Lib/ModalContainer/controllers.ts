const setupModalController = () => {
	let lastlyClosed: number | null = null;
	let isOpened: boolean = false;

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
	let shown: boolean = false;

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
