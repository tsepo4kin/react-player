import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { blobToArrayBuffer, formatTime } from '../../../utils/utils';
import { ADD_SONGS, DELETE_SONG } from '../../../infrastructure/redux';
import showNotification from '../../components/myToast/myToast';
import { ToastType } from '../../../infrastructure/controllers/notification.controllers';
import MyMenu from '../../components/myMenu/myMenu';
import { audioService } from '../../../infrastructure/controllers/audioItem.controllers';
import { MyModal } from '../../components/myDialog/myDialog';
import { ISearchedAudio, IAudio } from '../../../domain/models/audio';
import MyChip from '../../components/myChip/myChip';

// TODO: разделить на несколько компонентов

interface IAudioItem {
	song: ISearchedAudio | IAudio | HTMLAudioElement;
	idx?: number;
	canDelete?: boolean;
	canDownload?: boolean;
	hideButtons?: boolean;
	isActive?: boolean;
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
	canDelete = false,
	canDownload = false,
	hideButtons = false,
	isActive = false,
	onClick,
	draggable,
	onDragEnd,
	onDragStart,
	onDrop,
	onDragOver
}) => {
	const dispatch = useDispatch();
	const [isOpen, setIsOpen] = useState(false);
	const songs = useSelector((state: any) => state.songs);
	const homeAudios = [
		{
			text: 'Удалить',
			disabled: !(canDelete && idx !== undefined),
			onClick: () => {
				dispatch(DELETE_SONG(idx));
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

	const searchedAudios = [
		{
			text: 'Добавить',
			disabled: !canDownload,
			onClick: () => {
				saveInDatabase();
			}
		},
		{
			text: 'Предпросмотр',
			disabled: !canDownload,
			onClick: () => {
				setIsOpen(!isOpen);
			}
		}
	];

	const saveInDatabase = async () => {
		try {
			const file = await audioService.getBlobFromUrl(
				(song as ISearchedAudio).url
			);

			if (file) {
				const arrayBuffer = await blobToArrayBuffer(file);
				const trackInfo = {
					file: arrayBuffer,
					name: (song as ISearchedAudio).title
				};
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
		}
	};

	const saveOnDevice = (idx: number) => {
		if (songs[idx]) {
			const audio = songs[idx];
			audioService.download(audio);
		}
	};

	return (
		<div
			className={`flex flex-col items-center relative ${
				isActive ? 'bg-slate-500/25 rounded-lg py-2 px-2' : 'py-2 px-2'
			}`}
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
						(song as ISearchedAudio).thumbnail
							? (song as ISearchedAudio).thumbnail
							: 'https://i.pinimg.com/474x/d7/80/99/d780998902c6e43eee27b1cfc1469384.jpg'
					}
				/>
				{isActive && (
					<span className="absolute animate-pulse text-5xl h-12 w-12 mr-2 text-center">
						<i className="fa-solid fa-play"></i>
					</span>
				)}
				<p className="truncate">
					{(song as IAudio).name || (song as ISearchedAudio).title}
				</p>
				<div className="ml-auto" onClick={e => e.stopPropagation()}>
					{!hideButtons && (
						<MyMenu items={canDownload ? searchedAudios : homeAudios}>
							<i className="fa-solid fa-ellipsis-vertical"></i>
						</MyMenu>
					)}
				</div>
			</div>

			<MyModal
				title="Предпросмотр"
				onClose={() => {}}
				onConfirm={() => {}}
				showFooter={true}
				open={isOpen}
				handleOpen={setIsOpen}
			>
				<div>
					<iframe
						height="100%"
						width="100%"
						src={
							'https://www.youtube.com/' +
							(song as ISearchedAudio)?.url?.replace('watch?v=', 'embed/')
						}
						allow="autoplay; encrypted-media"
						allowFullScreen
					></iframe>
				</div>
				<div className="flex flex-col">
					<div className="my-2 flex">
						<span className="font-medium w-1/3">Перейти на ютуб</span>
						<a
							className="!text-red-700 hover:!text-red-400"
							target="blank"
							href={'https://www.youtube.com/' + (song as ISearchedAudio)?.url}
						>
							Ссылка
						</a>
					</div>
					<div className="my-2 flex">
						<span className="font-medium w-1/3">Длительность</span>
						<MyChip
							className="rounded-full"
							variant="ghost"
							value={formatTime((song as ISearchedAudio)?.duration)}
						/>
					</div>
					{Boolean(
						(song as ISearchedAudio).description ||
							(song as ISearchedAudio).shortDescription
					) && (
						<div className="my-2 flex">
							<span className="font-medium w-1/3">Описание</span>
							<span className="truncate w-2/3">
								{(song as ISearchedAudio).description ||
									(song as ISearchedAudio).shortDescription}
							</span>
						</div>
					)}
					<div className="my-2 flex">
						<span className="font-medium w-1/3">Автор</span>
						<a
							className="!text-red-700 hover:!text-red-400"
							target="blank"
							href={
								'https://www.youtube.com/' +
								(song as ISearchedAudio)?.uploaderUrl
							}
						>
							{(song as ISearchedAudio)?.uploaderName}
						</a>
					</div>
				</div>
			</MyModal>
		</div>
	);
};

export default AudioItem;
