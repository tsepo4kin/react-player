import { PlayerActions } from '../domain/actions/player.actions';
import { IPlayer, LoopState } from '../domain/models/player';

export class PlayerService extends PlayerActions {
	constructor(playerData: IPlayer) {
		super();

		this.playerData = playerData;
	}

	private playerData: IPlayer;

	public goNext(): void {}
	public goPrev(): void {}

	public playPause(setPlaying?: boolean): void {
		if (!this.playerData.audioElement) return;

		if (setPlaying !== undefined) {
			this.playerData.isPlayed = setPlaying;
			setPlaying
				? this.playerData.audioElement.play()
				: this.playerData.audioElement.pause();

			return;
		}

		if (this.playerData.isPlayed) {
			this.playerData.audioElement.pause();
			this.playerData.isPlayed = false;
		} else {
			this.playerData.audioElement.play();
			this.playerData.isPlayed = true;
		}
	}

	public muteUnmute(): void {
		if (!this.playerData.audioElement) return;

		if (this.playerData.isMuted) {
			this.playerData.audioElement.muted = false;
			this.playerData.isMuted = false;
		} else {
			this.playerData.audioElement.muted = true;
			this.playerData.isMuted = true;
		}
	}

	public setLoopState(state: LoopState): void {
		if (!this.playerData.audioElement) return;

		this.playerData.loopState = state;
		this.playerData.audioElement.loop = state === LoopState.LoopOne;
	}

	public changeVolume(volumeString: string): void {
		const volume = parseFloat(volumeString) / 100;
		if (!this.playerData.audioElement) return;

		this.playerData.volume = volume;
		this.playerData.audioElement.volume = volume;
	}

	public setCurrentTime(time: number): void {
		if (!this.playerData.audioElement) return;

		this.playerData.audioElement.currentTime = time;
	}

	public setAudioElement(element: HTMLAudioElement) {
		this.playerData.audioElement = element;
	}

	public getPlayerData(): IPlayer {
		return this.playerData;
	}

	public setOnEnd(cb: () => void) {
		if (!this.playerData.audioElement) return;

		this.playerData.audioElement.onended = cb;
	}

	public setNext(cb: () => void) {
		this.goNext = cb;
	}

	public setPrev(cb: () => void) {
		this.goPrev = cb;
	}
}
