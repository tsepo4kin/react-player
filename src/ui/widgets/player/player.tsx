import { FC, useEffect, useRef, useState } from 'react';
import MyIconBtn from '../../components/myIconBtn/myIconBtn';
import AudioItem from '../audioItem/audioItem';
import { useDispatch, useSelector } from 'react-redux';
import MySlider from '../../components/mySlider/mySlider';
import Timeline from './timeline';
import {
	createMediaSession,
	usePlayer
} from '../../../infrastructure/controllers/player.controllers';
import { SET_SELECTED_AUDIO_ID } from '../../../infrastructure/redux';
import { arrayBufferToBlob } from '../../../utils/utils';
import { LoopState } from '../../../domain/models/player';

const Player: FC = () => {
	const audioId = useSelector(
		(state: any) => state.currentAudio?.selectedAudioId
	);
	const { playerController, playerState, setPlayerState } = usePlayer();
	const songs = useSelector((state: any) => state.songs);
	const [isIphone, setIsIphone] = useState(false);
	const dispatch = useDispatch();
	const audioRef = useRef<HTMLAudioElement | null>(new Audio());
	const timer = useRef<number | undefined>();
	const mediaSession = createMediaSession(onPrev, onNext);

	useEffect(() => {
		if (navigator.userAgent.includes('iPhone')) {
			setIsIphone(true);
		}
		if (audioRef.current!.src) {
			URL.revokeObjectURL(audioRef.current!.src);
		}
		if (audioId >= 0) {
			const blob = arrayBufferToBlob(songs[audioId].file, 'audio/mp3');
			const audio = { file: blob, name: songs[audioId].name };
			audioRef.current!.title = audio.name;
			audioRef.current!.src = URL.createObjectURL(audio.file);
			audioRef.current!.addEventListener('playing', mediaSession);
			playerController.setAudioElement(audioRef.current!);
			playerController.playPause(true);
			setPlayerState({ ...playerController.getPlayerData() });
			updateTime();
		}

		return () => {
			URL.revokeObjectURL(audioRef.current!.src);
			audioRef.current!.removeEventListener('playing', mediaSession);
		};
	}, [audioId]);

	function onNext() {
		if (audioId < songs.length - 1) {
			dispatch(SET_SELECTED_AUDIO_ID(audioId + 1));
		} else if (audioId === songs.length - 1 && playerState.loopState === 1) {
			dispatch(SET_SELECTED_AUDIO_ID(0));
		}
	}

	function onPrev() {
		// TODO: single click - play from start, double click - play prev audio
		if (audioId > 0) {
			dispatch(SET_SELECTED_AUDIO_ID(audioId - 1));
		}
	}

	const playPause = () => {
		playerController.playPause();
		setPlayerState({ ...playerController.getPlayerData() });
	};

	const updateTime = () => {
		if (timer.current) {
			clearTimeout(timer.current);
		}

		if (!playerState.isPlayed) return;

		timer.current = setInterval(() => {
			setPlayerState({ ...playerController.getPlayerData() });
		}, 1000);
	};

	const rewind = (timeString: string) => {
		const range = (audioRef.current!.duration / 100) * parseFloat(timeString);
		if (!isNaN(range)) {
			playerController.setCurrentTime(range);
			setPlayerState({ ...playerController.getPlayerData() });
		}
	};

	const onVolumeChange = (volumeString: string) => {
		const volume = parseFloat(volumeString) / 100;
		playerController.changeVolume(volume);
		setPlayerState({ ...playerController.getPlayerData() });
	};

	const onSongEnd = () => {
		if (playerState.loopState === LoopState.LoopOne) {
			audioRef.current?.play();
		} else {
			onNext();
		}
	};

	const setLoopState = () => {
		const newState =
			playerState.loopState === LoopState.LoopOne
				? LoopState.NoLoop
				: playerState.loopState + 1;

		playerController.setLoopState(newState);
		setPlayerState({ ...playerController.getPlayerData() });
	};

	const onMute = () => {
		playerController.muteUnmute();
		setPlayerState({ ...playerController.getPlayerData() });
	};

	return (
		<div className="border border-gray-400 rounded py-2 px-2">
			{Boolean(playerState.audioElement) && (
				<AudioItem song={playerState.audioElement} />
			)}

			<Timeline
				duration={playerState.audioElement?.duration || 0}
				currentTime={playerState.audioElement?.currentTime || 0}
				disabled={!playerState.audioElement}
				onChange={e => rewind(e.target.value)}
			/>

			<div className="flex justify-center">
				<div className="mr-auto w-1/3">
					<MyIconBtn
						size="sm"
						variant={playerState.loopState !== 0 ? 'filled' : 'outlined'}
						onClick={() => setLoopState()}
					>
						<i className="fa-solid fa-repeat">
							{playerState.loopState === 2 && 1}
						</i>
					</MyIconBtn>
				</div>

				<MyIconBtn size="sm" variant="outlined" onClick={onPrev}>
					<i className="fa-solid fa-backward" />
				</MyIconBtn>

				<MyIconBtn
					className="mx-2"
					size="sm"
					variant="outlined"
					onClick={playPause}
				>
					{playerState.isPlayed ? (
						<i className="fa-solid fa-pause" />
					) : (
						<i className="fa-solid fa-play" />
					)}
				</MyIconBtn>

				<MyIconBtn size="sm" variant="outlined" onClick={onNext}>
					<i className="fa-solid fa-forward" />
				</MyIconBtn>

				<div className="ml-auto w-1/3">
					{isIphone ? (
						<MyIconBtn
							className="ml-auto block"
							size="sm"
							variant="outlined"
							onClick={onMute}
						>
							{playerState.isMuted ? (
								<i className="fa-solid fa-volume-xmark"></i>
							) : (
								<i className="fa-solid fa-volume-high"></i>
							)}
						</MyIconBtn>
					) : (
						<MySlider
							disabled={!playerState.audioElement}
							className="w-full cursor-pointer"
							value={playerState.volume * 100}
							onChange={e => onVolumeChange(e.target.value)}
						/>
					)}
				</div>
			</div>

			<audio hidden controls ref={audioRef} onEnded={() => onSongEnd()} />
		</div>
	);
};

export default Player;
