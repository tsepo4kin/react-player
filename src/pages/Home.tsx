import { useDispatch, useSelector } from 'react-redux';
import AudioItem from '../ui/widgets/audioItem/audioItem';
import { SET_SELECTED_AUDIO_ID } from '../redux';

const Home = () => {
	const songs = useSelector((state: any) => state.songs);
	const audioIdx = useSelector(
		(state: any) => state.currentAudio?.selectedAudioId
	);
	const dispatch = useDispatch();

	const onSelectCurrentTrack = (idx: number) => {
		if (audioIdx === null || idx !== audioIdx) {
			dispatch(SET_SELECTED_AUDIO_ID(idx));
		}
	};

	return (
		<div className="h-full w-full px-2 py-2 overflow-y-scroll">
			<div className="px-4">
				{songs.map((song: unknown, idx: number) => (
					<AudioItem
						className={
							idx === audioIdx
								? 'border border-gray-600 rounded-lg py-2 px-2'
								: 'py-2 px-2'
						}
						song={song}
						key={idx}
						idx={idx}
						canDelete={true}
						onClick={() => onSelectCurrentTrack(idx)}
					/>
				))}
			</div>
		</div>
	);
};

export default Home;
