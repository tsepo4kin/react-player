import { IPlayer, LoopState } from '../models/player';

export abstract class PlayerActions {
	public abstract playPause(setPlaying?: boolean): void;

	public abstract muteUnmute(): void;

	public abstract setLoopState(state: LoopState): void;

	public abstract changeVolume(volumeString: string): void;

	public abstract setAudioElement(auidoElement: HTMLAudioElement): void;

	public abstract setCurrentTime(time: number): void;

	public abstract getPlayerData(): IPlayer;

	public abstract goNext(): void;

	public abstract goPrev(): void;
}
