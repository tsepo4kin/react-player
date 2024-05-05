export async function getDownloadLink(youtubeId: string) {
	const streamUrl = 'https://youtu.be/' + youtubeId;
	const result = await fetch('https://co.wuk.sh/api/json', {
		method: 'POST',
		headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
		body: JSON.stringify({
			url: streamUrl,
			isAudioOnly: true,
			filenamePattern: 'basic'
		})
	})
		.then(r => r.json())
		.catch(e => console.log(e));
	return result;
}

export async function downloadAudioFromLink(
	url: string
	// progress?: (info: unknown) => void
) {
	const result = await fetch(url)
		.then(r => r.blob())
		.catch(e => console.log(e));
	return result;

	// TODO - прогресс загрузки.
	// const response = await fetch(url);
	// const contentLength = response.headers.get('content-length');
	// const total = +response.headers.get('Content-Length');
	// let loaded = 0;
	// console.log(response);
	// const res = new Response(
	// 	new ReadableStream({
	// 		async start(controller) {
	// 			const reader = response.body.getReader();
	// 			for (;;) {
	// 				const { done, value } = await reader.read();
	// 				if (done) break;
	// 				loaded += value.byteLength;
	// 				console.log(total, loaded, contentLength);
	// 				progress({ loaded, total });
	// 				controller.enqueue(value);
	// 			}
	// 			controller.close();
	// 		}
	// 	})
	// );
	// const blob = await res.blob();
	// return blob;
}

export async function searchFromYoutube(searchString: string) {
	const result = await fetch(
		`https://pipedapi.kavin.rocks/search?q=${searchString}&filter=all`
	)
		.then(r => r.json())
		.catch(e => console.log(e));
	return result;
}
