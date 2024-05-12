import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	arrayBufferToBlob,
	blobToArrayBuffer,
	downloadFile
} from '../../../utils/utils';
import { ADD_SONGS, DELETE_SONG } from '../../../infrastructure/redux';
import { AudioItemController } from '../../../infrastructure/controllers/audioItem.controllers';
import showNotification from '../../components/myToast/myToast';
import { ToastType } from '../../../infrastructure/controllers/notification.controllers';
import MyMenu from '../../components/myMenu/myMenu';

interface IAudioItem {
	song: any;
	idx?: number;
	className?: string;
	canDelete?: boolean;
	canDownload?: boolean;
	hideButtons?: boolean;
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
	hideButtons = false,
	onClick,
	draggable,
	onDragEnd,
	onDragStart,
	onDrop,
	onDragOver
}) => {
	const dispatch = useDispatch();
	const songs = useSelector((state: any) => state.songs);
	const menuItems = [
		{
			text: 'Удалить',
			disabled: !(canDelete && idx !== undefined),
			onClick: () => {
				dispatch(DELETE_SONG(idx));
			}
		},
		{
			text: 'Добавить',
			disabled: !canDownload,
			onClick: () => {
				saveInDatabase();
			}
		},
		{
			text: 'Скачать mp3',
			disabled: !(canDelete && idx !== undefined),
			onClick: () => {
				if (idx) {
					saveOnDevice(idx);
				}
			}
		}
	];
	// const [loadProgress, setLoadProgress] = useState(0);

	// const progress = (loaded: number, total: number) => {
	// 	console.log(Math.round((loaded / total) * 100), loaded, total);
	// 	setLoadProgress(Math.round((loaded / total) * 100));
	// };

	const saveInDatabase = async () => {
		try {
			const file = await AudioItemController.getBlobFromUrl(song.url);
			if (file) {
				const arrayBuffer = await blobToArrayBuffer(file);
				const trackInfo = { file: arrayBuffer, name: song.title };
				dispatch(ADD_SONGS([trackInfo]));
			}
			showNotification({
				type: ToastType.Success,
				text: 'Загрузка успешно завершена'
			});
		} catch (err) {
			showNotification({
				type: ToastType.Error,
				text: 'Ошибка загрузки аудио файла'
			});
		} finally {
			// setTimeout(() => setLoadProgress(0), 3000);
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
			className={`flex flex-col items-center ${className}`}
			onClick={onClick}
			draggable={draggable}
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			onDragOver={onDragOver}
			onDrop={onDrop}
			onTouchStart={onDragStart}
			onTouchEnd={onDragEnd}
		>
			<div className="flex items-center w-full">
				<img
					className="rounded h-12 w-12 mr-2"
					src={
						song.thumbnail
							? song.thumbnail
							: 'https://i.pinimg.com/474x/d7/80/99/d780998902c6e43eee27b1cfc1469384.jpg'
					}
				/>
				<p className="truncate">{(song && song.name) || song.title}</p>
				<div className="ml-auto" onClick={e => e.stopPropagation()}>
					{!hideButtons && (
						<MyMenu items={menuItems}>
							<i className="fa-solid fa-ellipsis-vertical"></i>
						</MyMenu>
					)}
				</div>
			</div>
			{/* {loadProgress} */}
			{/* {canDownload && Boolean(loadProgress) && (
				<MyProgress className="w-full my-2" size="sm" value={loadProgress} />
			)} */}
		</div>
	);
};

export default AudioItem;
