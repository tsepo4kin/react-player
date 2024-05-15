import {
	AudioDownloadQuery,
	AudioMetadataQuery,
	AudioSearchQuery
} from '../../domain/actions/audio.actions';
import {
	IAudioMetadataResponse,
	ISearchedAudiosResult
} from '../../domain/models/audio';
import { Queryable } from '../http.client';

export class Actions {
	@Queryable(AudioSearchQuery)
	async searchFromYoutube(
		query: AudioSearchQuery
	): Promise<ISearchedAudiosResult> {
		const result = await fetch(
			`https://pipedapi.kavin.rocks/search?q=${query.searchString}&filter=all`
		)
			.then(r => r.json())
			.catch(e => console.log(e));
		return result;
	}

	@Queryable(AudioMetadataQuery)
	async getDownloadLink(
		query: AudioMetadataQuery
	): Promise<IAudioMetadataResponse> {
		const result = await fetch('https://co.wuk.sh/api/json', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				url: `https://youtu.be/${query.youtubeId}`,
				isAudioOnly: true,
				filenamePattern: 'basic'
			})
		})
			.then(r => r.json())
			.catch(e => console.log(e));
		return result;
	}

	@Queryable(AudioDownloadQuery)
	async downloadAudioFromURL(
		query: AudioDownloadQuery
	): Promise<Blob> {
		const result = await fetch(query.url)
			.then(r => r.blob())
			// .catch(e => console.log(e));
		return result;
	}
}
