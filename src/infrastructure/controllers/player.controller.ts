import { useState } from 'react';
import { PlayerService } from '../../application/player.service';
import { IPlayer, LoopState } from '../../domain/models/player';

const playerController = new PlayerService({
	isPlayed: false,
	isMuted: false,
	volume: 0.5,
	loopState: LoopState.LoopAll
});

export function usePlayer() {
	const [playerState, setPlayerState] = useState<IPlayer>(
		playerController.getPlayerData()
	);

	return { playerController, playerState, setPlayerState };
}

export function createMediaSession(goPrev: () => void, goNext: () => void) {
  return function() {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('previoustrack', goPrev);
  
      navigator.mediaSession.setActionHandler('nexttrack', goNext);
  
      navigator.mediaSession.setActionHandler('play', () => {
        playerController.playPause(true);
      });
  
      navigator.mediaSession.setActionHandler('pause', () => {
        playerController.playPause(false);
      });
  
      navigator.mediaSession.setActionHandler('seekto', details => {
        if (!details.seekTime) return;
  
        playerController.setCurrentTime(details.seekTime);
      });
    }
  }
}
