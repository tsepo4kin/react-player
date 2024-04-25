import { FC, useEffect, useRef, useState } from 'react';
import MyIconBtn from '../../components/myIconBtn/myIconBtn';
import AudioItem from '../audioItem/audioItem';
import { useSelector } from 'react-redux';
import MySlider from '../../components/mySlider/mySlider';
import Timeline from './timeline';

const Player: FC = () => {
	const currentTrack = useSelector((state: any) => state.playData?.track);
	const [isPlayed, setIsPlayed] = useState(false);
	const [audioRange, setAudioRange] = useState(0);
	const [volumeRange, setVolumeRange] = useState(0.5);

	const audioRef = useRef<HTMLAudioElement | null>(new Audio());

	const playPause = async () => {
		try {
			if (isPlayed) {
				await audioRef.current?.pause();
				setIsPlayed(false);
			} else {
				await audioRef.current?.play();
				setIsPlayed(true);
			}
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		if (audioRef.current!.src) {
			URL.revokeObjectURL(audioRef.current!.src);
		}
		if (currentTrack?.file) {
			audioRef.current!.src = URL.createObjectURL(currentTrack?.file);
		}
	}, [currentTrack]);

	const updateTime = () => {
		const currentTime =
			(100 * audioRef.current!.currentTime) / audioRef.current!.duration || 0;

		setAudioRange(Math.round(currentTime));
	};

	const rewind = (timeString: string) => {
		setAudioRange(parseFloat(timeString));
		const range = (audioRef.current!.duration / 100) * parseFloat(timeString);
		if (!isNaN(range)) {
			audioRef.current!.currentTime = range;
		}
	};

	const onVolumeChange = (volumeString: string) => {
		const volume = parseFloat(volumeString) / 100;
		setVolumeRange(volume);
		audioRef.current!.volume = volume;
	};

	const onNext = () => {
		console.log('next');
	};

	const onPrev = () => {
		console.log('prev');
	};

	const onSongEnd = () => {
		setIsPlayed(false);
	};

	return (
		<div className="border border-gray-400 rounded py-2 px-2">
			{Boolean(currentTrack) && <AudioItem song={currentTrack} />}

			<Timeline
				duration={audioRef.current!.duration}
				currenttime={audioRef.current!.currentTime}
				disabled={!currentTrack}
				value={audioRange}
				onChange={e => rewind(e.target.value)}
			/>

			<div className="flex justify-center">
				<div className="mr-auto w-20"></div>

				<MyIconBtn size="sm" variant="outlined" onClick={onPrev}>
					<i className="fa-solid fa-backward" />
				</MyIconBtn>

				<MyIconBtn
					className="mx-2"
					size="sm"
					variant="outlined"
					onClick={playPause}
				>
					{isPlayed ? (
						<i className="fa-solid fa-pause" />
					) : (
						<i className="fa-solid fa-play" />
					)}
				</MyIconBtn>

				<MyIconBtn size="sm" variant="outlined" onClick={onNext}>
					<i className="fa-solid fa-forward" />
				</MyIconBtn>

				<MySlider
					disabled={false}
					className="ml-auto w-20 cursor-pointer"
					value={volumeRange * 100}
					onChange={e => onVolumeChange(e.target.value)}
				/>
			</div>

			<audio
				hidden
				controls
				ref={audioRef}
				onEnded={() => onSongEnd()}
				onTimeUpdate={() => updateTime()}
			></audio>
		</div>
	);
};

export default Player;
