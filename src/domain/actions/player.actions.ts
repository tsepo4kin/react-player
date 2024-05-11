import { IPlayer, LoopState, PlayerVolume } from '../models/player';

export abstract class PlayerActions {
	public abstract playPause(setPlaying?: boolean): void;

	public abstract muteUnmute(): void;

	public abstract setLoopState(state: LoopState): void;

	public abstract changeVolume(volume: PlayerVolume): void;

	public abstract setAudioElement(auidoElement: HTMLAudioElement): void;

	public abstract setCurrentTime(time: number): void;

	public abstract getPlayerData(): IPlayer;
}
