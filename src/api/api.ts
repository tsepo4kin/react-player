export async function getDownloadLink(youtubeId: string) {
	const streamUrl = 'https://youtu.be/' + youtubeId
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
		.catch(e => console.log(e))
	return result
}

export async function downloadAudioFromLink(url: string) {
	const result = await fetch(url)
		.then(r => r.blob())
		.catch(e => console.log(e))
	return result
}

export async function searchFromYoutube(searchString: string) {
	const result = await fetch(`https://pipedapi.kavin.rocks/search?q=${searchString}&filter=all`)
		.then(r => r.json())
		.catch(e => console.log(e))
	return result;
}