import { FC, PropsWithChildren, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { blobToArrayBuffer } from '../../../utils/utils';
import { ADD_SONGS } from '../../../infrastructure/redux';
import MyMenu from '../../components/myMenu/myMenu';
import { MyModal } from '../../components/myDialog/myDialog';
import MyInputText from '../../components/myInputText/myInputText';
import { audioService } from '../../../infrastructure/controllers/audioItem.controllers';
import showNotification from '../../components/myToast/myToast';
import { ToastType } from '../../../infrastructure/controllers/notification.controllers';

export interface IHeaderProps {}

const Header: FC<PropsWithChildren<IHeaderProps>> = () => {
	const input = useRef<HTMLInputElement | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [youtubeUrl, setYoutubeUrl] = useState('');
	const dispatch = useDispatch();

	const addSongs = () => {
		if (input.current) {
			const filePicker: HTMLInputElement = input.current!;
			filePicker.click();
		}
	};

	const onInputFile = async (files: FileList | null) => {
		if (files) {
			const res = [];
			for (let file of files) {
				const arrayBuffer = await blobToArrayBuffer(file);
				const trackInfo = { file: arrayBuffer, name: file.name };
				res.push(trackInfo);
			}
			dispatch(ADD_SONGS(res));
		}
	};

	const getFromUrl = async () => {
		try {
			const { file, title } = await audioService.getBlobFromUrl(youtubeUrl);

			if (file) {
				const arrayBuffer = await blobToArrayBuffer(file);
				const trackInfo = {
					file: arrayBuffer,
					name: title
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

	const showAddFromLinkModal = () => {
		setIsOpen(!isOpen);
	};

	return (
		<header className="px-2 py-2 w-full">
			<div className="flex justify-end">
				<MyMenu
					items={[
						{ text: 'Импорт', onClick: addSongs },
						{ text: 'Добавить по ссылке', onClick: showAddFromLinkModal }
					]}
				>
					<i className="fa-solid fa-ellipsis-vertical"></i>
				</MyMenu>
			</div>

			<input
				hidden
				multiple
				type="file"
				ref={input}
				accept="audio/mp3,audio/wav,audio/ogg"
				onChange={e => {
					onInputFile(e.target.files);
				}}
			/>

			<MyModal
				title="Добавить по ссылке"
				onClose={() => {}}
				onConfirm={getFromUrl}
				showFooter={true}
				open={isOpen}
				handleOpen={setIsOpen}
			>
				<div>
					<MyInputText
						value={youtubeUrl}
						onChange={e => setYoutubeUrl(e.target.value)}
					></MyInputText>
				</div>
			</MyModal>
		</header>
	);
};

export default Header;
