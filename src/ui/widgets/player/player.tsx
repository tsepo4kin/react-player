import { FC, useEffect, useRef, useState } from 'react';
import MyIconBtn from '../../components/myIconBtn/myIconBtn';
import AudioItem from '../audioItem/audioItem';
import { useSelector } from 'react-redux';
import MySlider from '../../components/mySlider/mySlider';
import Timeline from './timeline';
import { LoopState } from '../../../domain/models/player';
import { usePlayer } from '../../hooks/usePlayer';

const Player: FC = () => {
	const audioId = useSelector(
		(state: any) => state.currentAudio?.selectedAudioId
	);
	const { playerController, playerState, setPlayerState } = usePlayer();
	const [isIphone, setIsIphone] = useState(false);
	const timer = useRef<number | undefined>();

	useEffect(() => {
		if (navigator.userAgent.includes('iPhone')) {
			setIsIphone(true);
		}
		setPlayerState({ ...playerController.getPlayerData() });
		updateTime();
	}, [audioId]);

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
		const range =
			(playerState.audioElement!.duration / 100) * parseFloat(timeString);
		if (!isNaN(range)) {
			playerController.setCurrentTime(range);
			setPlayerState({ ...playerController.getPlayerData() });
		}
	};

	const onVolumeChange = (volumeString: string) => {
		playerController.changeVolume(volumeString);
		setPlayerState({ ...playerController.getPlayerData() });
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
		<div className="w-full bg-neutral-300 rounded py-2 px-2 mt-auto">
			{Boolean(playerState.audioElement) && (
				<AudioItem
					hideButtons={true}
					song={playerState.audioElement as HTMLAudioElement}
				/>
			)}

			<Timeline
				duration={playerState.audioElement?.duration || 0}
				currentTime={playerState.audioElement?.currentTime || 0}
				disabled={!playerState.audioElement}
				onChange={e => {
					rewind(e.target.value);
				}}
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

				<MyIconBtn
					size="sm"
					variant="outlined"
					onClick={() => playerController.goPrev()}
				>
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

				<MyIconBtn
					size="sm"
					variant="outlined"
					onClick={() => playerController.goNext()}
				>
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
		</div>
	);
};

export default Player;
