import { FC, useEffect, useRef, useState } from 'react';
import MyIconBtn from '../../components/myIconBtn/myIconBtn';
import AudioItem from '../audioItem/audioItem';
import { useSelector } from 'react-redux';


const Player: FC = () => {
	const currentTrack = useSelector((state: any) => state.playData?.track);
	const [isPlayed, setIsPlayed] = useState(false);
	const [range, setRange] = useState(0);

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
			console.log(e)
		}
	};

	useEffect(() => {
		if (audioRef.current!.src) {
			URL.revokeObjectURL(audioRef.current!.src)	
		}
		if (currentTrack?.file) {
			audioRef.current!.src = URL.createObjectURL(currentTrack?.file);
		}
	}, [currentTrack]);

	const updateTime = () => {
		const currentTime =
			(100 * audioRef.current!.currentTime) / audioRef.current!.duration || 0;

		setRange(Math.round(currentTime));
	};

	const rewind = (timeString: string) => {
		setRange(parseFloat(timeString));
		const range = (audioRef.current!.duration / 100) * parseFloat(timeString);
		if (!isNaN(range)) {
			audioRef.current!.currentTime = range;
		}
	};

	return (
		<div className="border border-gray-400 rounded py-2 px-2">
			{Boolean(currentTrack) && <AudioItem song={currentTrack} />}

			<input
				className="w-full"
				type="range"
				min={0}
				max={100}
				step={0.01}
				value={range}
				onChange={e => rewind(e.target.value)}
			/>

			{audioRef.current && (
				<span>
					{!isNaN(audioRef.current!.currentTime) &&
						Math.round(audioRef.current.currentTime)}{' '}
					/{' '}
					{!isNaN(audioRef.current!.duration) &&
						Math.round(audioRef.current!.duration)}
				</span>
			)}

			<div className="flex justify-center">
				<MyIconBtn size="sm" variant="outlined" onClick={playPause}>
					{isPlayed ? (
						<i className="fa-solid fa-pause" />
					) : (
						<i className="fa-solid fa-play" />
					)}
				</MyIconBtn>
			</div>

			<audio
				hidden
				controls
				ref={audioRef}
				// onEnded={() => onSongEnd()}
				onTimeUpdate={() => updateTime()}
			></audio>
		</div>
	);
};

export default Player;
