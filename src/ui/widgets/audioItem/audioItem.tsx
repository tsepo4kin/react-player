import { FC } from 'react';
import MyIconBtn from '../../components/myIconBtn/myIconBtn';
import { useDispatch, useSelector } from 'react-redux';
import {
	arrayBufferToBlob,
	blobToArrayBuffer,
	downloadFile
} from '../../../utils/utils';
import { ADD_SONGS, DELETE_SONG } from '../../../infrastructure/redux';
import { AudioItemController } from '../../../infrastructure/controllers/audioItem.controllers';
// import Progress from '@material-tailwind/react/components/Progress';

interface IAudioItem {
	song: any;
	idx?: number;
	className?: string;
	canDelete?: boolean;
	canDownload?: boolean;
	onClick?: () => void;
	draggable?: boolean;
	onDragStart?: (e: unknown) => void;
	onDragEnd?: (e: unknown) => void;
	onDragOver?: (e: unknown) => void;
	onDrop?: () => void;
}

const AudioItem: FC<IAudioItem> = ({
	song,
	idx,
	className,
	canDelete = false,
	canDownload = false,
	onClick,
	draggable,
	onDragEnd,
	onDragStart,
	onDrop,
	onDragOver
}) => {
	const dispatch = useDispatch();
	const songs = useSelector((state: any) => state.songs);
	// const [loadProgress, setLoadProgress] = useState(0);

	// const progress = ({ loaded, total }) => {
	// 	console.log(Math.round((loaded / total) * 100), loaded, total);
	// 	setLoadProgress(Math.round((loaded / total) * 100));
	// };

	// TODO - вынести отсюда, чтобы можно было переключаться между страницами при загрузке
	const saveInDatabase = async () => {
		const file = await AudioItemController.getBlobFromUrl(song.url)
		if (file) {
			const arrayBuffer = await blobToArrayBuffer(file);
			const trackInfo = { file: arrayBuffer, name: song.title };
			dispatch(ADD_SONGS([trackInfo]));
		}
	};

	const saveOnDevice = (idx: number) => {
		if (songs[idx]) {
			const audio = songs[idx];
			const blob = arrayBufferToBlob(audio.file, 'audio/mp3');
			downloadFile(window.URL.createObjectURL(blob), `${audio.name}.mp3`);
		}
	};

	return (
		<div
			className={`flex items-center ${className}`}
			onClick={onClick}
			draggable={draggable}
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			onDragOver={onDragOver}
			onDrop={onDrop}
			onTouchStart={onDragStart}
			onTouchEnd={onDragEnd}
		>
			<img
				className="rounded h-12 w-12 mr-2"
				src={
					song.thumbnail
						? song.thumbnail
						: 'https://i.pinimg.com/474x/d7/80/99/d780998902c6e43eee27b1cfc1469384.jpg'
				}
			/>
			<p className="truncate">{(song && song.name) || song.title}</p>
			{canDelete && idx !== undefined && (
				<div className="ml-auto min-w-20">
					<MyIconBtn
						size="sm"
						variant="outlined"
						onClick={e => {
							e.stopPropagation();
							dispatch(DELETE_SONG(idx));
						}}
					>
						<i className="fa-solid fa-trash-can"></i>
					</MyIconBtn>

					<MyIconBtn
						className="ml-2"
						size="sm"
						variant="outlined"
						onClick={e => {
							e.stopPropagation();
							saveOnDevice(idx);
						}}
					>
						<i className="fa-solid fa-floppy-disk"></i>
					</MyIconBtn>
				</div>
			)}

			{canDownload && (
				<div className="ml-auto">
					<MyIconBtn
						size="sm"
						variant="outlined"
						onClick={e => {
							e.stopPropagation();
							saveInDatabase();
						}}
					>
						<i className="fa-solid fa-add"></i>
					</MyIconBtn>
				</div>
			)}
			{/* {loadProgress} */}
			{/* <Progress
				value={loadProgress}
				variant="filled"
				size="lg"
				className="border border-gray-900/10 bg-gray-900/5 p-1"
			/> */}
		</div>
	);
};

export default AudioItem;
