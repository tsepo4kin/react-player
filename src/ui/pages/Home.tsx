import { useDispatch, useSelector } from 'react-redux';
import AudioItem from '../widgets/audioItem/audioItem';
import { useEffect, useState } from 'react';
import { SET_SELECTED_AUDIO_ID, SORT_SONGS } from '../../infrastructure/redux';
import ControlGroup from '../widgets/controlGroup/controlGroup';
import { useNavigate } from 'react-router-dom';
import { IAudio } from '../../domain/models/audio';

const Home = () => {
	const navigate = useNavigate();
	const songs = useSelector((state: any) => state.songs);
	const selectedAudioId = useSelector(
		(state: any) => state.currentAudio?.selectedAudioId
	);
	const [audioIdx, setAudioIdx] = useState<number>(selectedAudioId);
	const dispatch = useDispatch();
	const [draggedItem, setDraggedItem] = useState<null | Record<
		string,
		unknown
	>>(null);

	useEffect(() => {
		setAudioIdx(selectedAudioId);
	}, [selectedAudioId]);

	const onSelectCurrentTrack = (idx: number) => {
		if (audioIdx === null || idx !== audioIdx) {
			dispatch(SET_SELECTED_AUDIO_ID(idx));
		}
	};

	const handleDragStart = (e: any, item: any) => {
		setDraggedItem(item);
		e.dataTransfer.setData('text/plain', '');
	};

	const handleDragEnd = () => {
		setDraggedItem(null);
	};

	const handleDragOver = (e: any) => {
		e.preventDefault();
	};

	const handleDrop = (targetItem: any) => {
		if (!draggedItem) return;

		const currentIndex = songs.indexOf(draggedItem);
		const targetIndex = songs.indexOf(targetItem);

		if (currentIndex !== -1 && targetIndex !== -1) {
			dispatch(SORT_SONGS(draggedItem.name as string, targetIndex));
			setAudioIdx(targetIndex);
		}
	};

	return (
		<>
			<div className="h-full w-full px-2 py-2 overflow-y-scroll">
				<div className="px-4">
					{songs.map((song: { name: string }, idx: number) => (
						<AudioItem
							isActive={idx === audioIdx}
							song={song as IAudio}
							key={song.name}
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
			{selectedAudioId >= 0 && songs[selectedAudioId] && (
				<div className="w-full" onClick={() => navigate('/player')}>
					<ControlGroup name={songs[selectedAudioId].name} />
				</div>
			)}
		</>
	);
};

export default Home;
