const getNumberWithLeadingZero = (n: number) => `${n < 10 ? '0' : ''}${n}`;

export const formatTime = (ms?: number): string => {
	if (typeof ms !== 'number' || !Number.isFinite(ms) || ms < 0) {
		return '--:--';
	}

	const hours = Math.floor(ms / 60 / 60);
	const minutes = Math.floor((ms % 3600) / 60);
	const seconds = Math.floor((ms % 3600) % 60);
	const time: (number | string)[] = [
		getNumberWithLeadingZero(minutes),
		getNumberWithLeadingZero(seconds)
	];

	if (hours) {
		time.unshift(hours);
	}

	return time.join(':');
};

export function blobToArrayBuffer(blob: Blob): Promise<ArrayBuffer> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.addEventListener('loadend', _ => {
			resolve(reader.result as ArrayBuffer);
		});
		reader.addEventListener('error', reject);
		reader.readAsArrayBuffer(blob);
	});
}

export function arrayBufferToBlob(buffer: ArrayBuffer, type: string): Blob {
	return new Blob([buffer], { type: type });
}

export function downloadFile(href: string, fileName?: string): void {
	const a = document.createElement('a');
	a.href = href;
	a.download = fileName ?? 'download';
	document.body.appendChild(a);
	a.click();
	setTimeout(() => {
		document.body.removeChild(a);
		window.URL.revokeObjectURL(href);
	}, 0);
}
