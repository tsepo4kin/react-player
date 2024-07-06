import axios from 'axios';
import {
	AudioDownloadQuery,
	AudioMetadataQuery,
	AudioSearchQuery,
	YoutubeInfoQuery
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
		const { data } = await axios.get(
			`https://pipedapi.kavin.rocks/search?q=${query.searchString}&filter=all`
		);
		return data;
	}

	@Queryable(YoutubeInfoQuery) async getYoutubeInfo(query: YoutubeInfoQuery) {
		const { data } = await axios.get(
			`https://pipedapi.kavin.rocks/streams/${query.id}`
		);
		return data;
	}

	@Queryable(AudioMetadataQuery)
	async getDownloadLink(
		query: AudioMetadataQuery
	): Promise<IAudioMetadataResponse> {
		const { data } = await axios.post(
			'https://co.wuk.sh/api/json',
			{
				url: query?.fullUrl
					? query.fullUrl
					: `https://youtu.be/${query.youtubeId}`,
				isAudioOnly: true,
				filenamePattern: 'pretty'
			},
			{
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			}
		);

		return data;
	}

	@Queryable(AudioDownloadQuery)
	async downloadAudioFromURL(query: AudioDownloadQuery): Promise<Blob> {
		const { data } = await axios.get(query.url, {
			responseType: 'blob'
		});

		return data;
	}
}
