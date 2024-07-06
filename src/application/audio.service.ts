import {
	AudioDownloadQuery,
	AudioMetadataQuery,
	AudioSearchQuery,
	YoutubeInfoQuery
} from '../domain/actions/audio.actions';
import {
	AudioName,
	IAudioMetadataResponse,
	ISearchedAudio,
	ISearchedAudiosResult
} from '../domain/models/audio';
import { arrayBufferToBlob, downloadFile } from '../utils/utils';
import { IHttpClient } from './httpClient';

export class AudioService {
	constructor(
		private readonly httpClient: IHttpClient // IHttpClient<Namespace>
	) {}

	public async searchAudio(
		searchString: AudioName
	): Promise<Array<ISearchedAudio>> {
		const result = await this.httpClient.request<
			AudioSearchQuery,
			ISearchedAudiosResult
		>(new AudioSearchQuery(searchString));
		return result.items.filter(this.filterAudioFoo);
	}

	public async getBlobFromUrl(
		url: string,
		fromFullUrl?: boolean
	): Promise<{ file: Blob; title: string }> {
		let youtubeId = '';
		if (!fromFullUrl) {
			youtubeId = url.replace(/.*\/watch\?v=/gi, '');
		} else {
			const urlObj = new URL(url);
			if (urlObj.searchParams.get('v')) {
				youtubeId = urlObj.searchParams.get('v') as string;
			} else {
				youtubeId = urlObj.pathname.replace('/', '');
			}
		}

		const { title } = await this.httpClient.request<
			YoutubeInfoQuery,
			{ title: string }
		>(new YoutubeInfoQuery(youtubeId));

		const metaData = await this.httpClient.request<
			AudioMetadataQuery,
			IAudioMetadataResponse
		>(new AudioMetadataQuery(youtubeId));

		const audioBlob = await this.httpClient.request<AudioDownloadQuery, Blob>(
			new AudioDownloadQuery(metaData.url)
		);

		const file = new File([audioBlob], title, {
			type: 'audio/mp3'
		});
	
		return { file, title };
	}

	public download(audio: { file: ArrayBuffer; name: string }) {
		const blob = arrayBufferToBlob(audio.file, 'audio/mp3');
		downloadFile(window.URL.createObjectURL(blob), `${audio.name}.mp3`);
	}

	private filterAudioFoo(el: ISearchedAudio): boolean {
		if (el?.type !== 'stream') {
			return false;
		}
		if (el.isShort) {
			return false;
		}
		if (el.duration > 1000) {
			return false;
		}
		if (!el.title || !el.url) {
			return false;
		}

		return true;
	}
}
