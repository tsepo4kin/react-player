import { FC, useEffect, useRef, useState } from 'react'
import MyIconBtn from '../../components/myIconBtn/myIconBtn'
import AudioItem from '../audioItem/audioItem'

interface IPlayer {
	currentTrack: MediaSource | null
}

const Player: FC<IPlayer> = ({ currentTrack }) => {
	const [isPlayed, setIsPlayed] = useState(false)
	const [range, setRange] = useState(0)

	const audio = useRef<HTMLAudioElement | null>(null)

	const playPause = () => {
		if (isPlayed) {
			audio.current?.pause()
			setIsPlayed(false)
		} else {
			audio.current?.play()
			setIsPlayed(true)
		}
	}

	useEffect(() => {
		if (currentTrack) {
			audio.current!.src = URL.createObjectURL(currentTrack)
		}
	}, [currentTrack])

	const updateTime = () => {
		const currentTime =
			(100 * audio.current!.currentTime) / audio.current!.duration || 0

		setRange(Math.round(currentTime))
	}

	const rewind = (timeString: string) => {
		setRange(parseFloat(timeString))
		const range = (audio.current!.duration / 100) * parseFloat(timeString)
		if (!isNaN(range)) {
			audio.current!.currentTime = range
		}
	}

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

			{audio.current && (
				<span>
					{!isNaN(audio.current!.currentTime) &&
						Math.round(audio.current.currentTime)}{' '}
					/{' '}
					{!isNaN(audio.current!.duration) &&
						Math.round(audio.current!.duration)}
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
				ref={audio}
				// onEnded={() => onSongEnd()}
				onTimeUpdate={() => updateTime()}
			></audio>
		</div>
	)
}

export default Player
