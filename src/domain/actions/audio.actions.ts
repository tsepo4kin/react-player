// import { AudioName, IAudio } from '../models/audio';

// TODO: Описать нормально

// export abstract class AuidoActions {
// 	public abstract getAuidos(): Promise<Array<IAudio>>;

// 	public abstract getCurrentAudio(audioId: UniqueId): Promise<IAudio>;

// 	public abstract setCurrentAudio(audioId: UniqueId): void;

// 	public abstract searchAudio(searchString: AudioName): Promise<Array<IAudio>>;

// 	public abstract addAudio(audio: IAudio): void;

// 	public abstract deleteAudio(audioId: UniqueId): void;
// }

export class AudioSearchQuery {
	constructor(public searchString: string) {}
}

export class AudioDownloadQuery {
	constructor(public url: string) {}
}

export class AudioMetadataQuery {
	constructor(public youtubeId?: string, public fullUrl?: string) {}
}

export class YoutubeInfoQuery {
	constructor(public id: string) {}
}
