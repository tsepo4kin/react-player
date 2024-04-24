import { useDispatch, useSelector } from 'react-redux';
import AudioItem from '../ui/widgets/audioItem/audioItem';
import { SET_CURRENT_TRACK } from '../redux';
import { arrayBufferToBlob } from '../utils/indexedDb';

const Home = () => {
	const songs = useSelector((state: any) => state.songs);
	const dispatch = useDispatch();

	const onSelectCurrentTrack = (track: any) => {
		const currentTrack: any = {};
		const blob = arrayBufferToBlob(track.file, 'audio/mp3')
		currentTrack.file = blob;
		currentTrack.name = track.name;
		dispatch(SET_CURRENT_TRACK(currentTrack));
	};

	return (
		<div className="h-full w-full px-2 py-2 overflow-y-scroll">
			<div className="px-4">
				{songs.map((song: unknown, idx: number) => (
					<AudioItem
						className="py-2"
						song={song}
						key={idx}
						idx={idx}
						canDelete={true}
						onClick={() => onSelectCurrentTrack(songs[idx])}
					/>
				))}
			</div>
		</div>
	);
};

export default Home;
