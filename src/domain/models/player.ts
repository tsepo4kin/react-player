export type PlayerVolume = number;

export enum LoopState {
	NoLoop = 0,
	LoopAll,
	LoopOne
}

export interface IPlayer {
	audioElement?: HTMLAudioElement;

	isPlayed: boolean;
	isMuted: boolean;
	volume: PlayerVolume;
	loopState: LoopState;
};
