import { useDispatch, useSelector } from 'react-redux';
import AudioItem from '../widgets/audioItem/audioItem';
import { useState } from 'react';
import { SET_SELECTED_AUDIO_ID, SORT_SONGS } from '../../infrastructure/redux';

const Home = () => {
	const songs = useSelector((state: any) => state.songs);
	const audioIdx = useSelector(
		(state: any) => state.currentAudio?.selectedAudioId
	);
	const dispatch = useDispatch();
	const [draggedItem, setDraggedItem] = useState<null | Record<
		string,
		unknown
	>>(null);

	const onSelectCurrentTrack = (idx: number) => {
		if (audioIdx === null || idx !== audioIdx) {
			dispatch(SET_SELECTED_AUDIO_ID(idx));
		}
	};

	const handleDragStart = (e: any, item: any) => {
		setDraggedItem(item);
		e.dataTransfer.setData('text/plain', '');
	};

	const handleDragEnd = (e: any) => {
		setDraggedItem(null);
		// e.target.style.border = 'none';
	};

	const handleDragOver = (e: any) => {
		e.preventDefault();
		// e.target.style.border = '2px dashed black';
	};

	const handleDrop = (targetItem: any) => {
		if (!draggedItem) return;

		const currentIndex = songs.indexOf(draggedItem);
		const targetIndex = songs.indexOf(targetItem);
		console.log(draggedItem);

		if (currentIndex !== -1 && targetIndex !== -1) {
			dispatch(SORT_SONGS(draggedItem.name as string, targetIndex));
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
						draggable={true}
						onDragStart={e => handleDragStart(e, song)}
						onDragEnd={handleDragEnd}
						onDragOver={handleDragOver}
						onDrop={() => handleDrop(song)}
					/>
				))}
			</div>
		</div>
	);
};

export default Home;
