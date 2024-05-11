import {
	AudioDownloadQuery,
	AudioMetadataQuery
} from '../../domain/actions/audio.actions';
import { getDownloadLink, downloadAudioFromURL } from '../api/api';

class DownloadController {
	public async getBlobFromUrl(url: string): Promise<Blob | void> {
		const youtubeId = url.replace('/watch?v=', '');
		const metaData = (await getDownloadLink(
			new AudioMetadataQuery(youtubeId)
		)) as { url: string };
		const audioBlob = await downloadAudioFromURL(
			new AudioDownloadQuery(metaData.url as string)
		);
		if (audioBlob) {
			const file = new File([audioBlob], '', {
				type: 'audio/mp3'
			});
			return file;
		}
	}
}

export const AudioItemController = new DownloadController();
