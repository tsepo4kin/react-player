import { AudioName, IAudio } from '../models/audio';

export abstract class AuidoActions {
	public abstract getAuidos(): Promise<Array<IAudio>>;

	public abstract getCurrentAudio(audioId: UniqueId): Promise<IAudio>;

	public abstract setCurrentAudio(audioId: UniqueId): void;

	public abstract searchAudio(searchString: AudioName): Promise<Array<IAudio>>;

	public abstract addAudio(audio: IAudio): void;

	public abstract deleteAudio(audioId: UniqueId): void;

	// public abstract updateAudio(audioId: UniqueId): void;

	// public abstract sortAudios(audioId: UniqueId): void;

	// public abstract setAudioTag(audioId: UniqueId): void;
}

export class AudioSearchQuery {
  constructor(public searchString: AudioName) {}
}

export class AudioDownloadQuery {
	constructor(public url: string) {}
}

export class AudioMetadataQuery {
	constructor(public youtubeId: string) {}
}
