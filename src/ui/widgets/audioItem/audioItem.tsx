import { FC } from 'react';
import MyIconBtn from '../../components/myIconBtn/myIconBtn';
import { useDispatch } from 'react-redux';
import { ADD_SONGS, DELETE_SONG } from '../../../redux/actions';
import { getDownloadLink, downloadAudioFromLink } from '../../../api/api';
import { blobToArrayBuffer } from '../../../utils/indexedDb';

interface IAudioItem {
	song: any;
	idx?: number;
	className?: string;
	canDelete?: boolean;
	canDownload?: boolean;
	onClick?: () => void;
}

const AudioItem: FC<IAudioItem> = ({
	song,
	idx,
	className,
	canDelete = false,
	canDownload = false,
	onClick
}) => {
	const dispatch = useDispatch();

	const saveInDatabase = async () => {
		const ytLink = song.url.replace('/watch?v=', '');
		const metaData = await getDownloadLink(ytLink);
		const audioBlob = await downloadAudioFromLink(metaData.url);
		if (audioBlob) {
			const file = new File([audioBlob], song.title, {
				type: 'audio/mp3'
			});
			const arrayBuffer = await blobToArrayBuffer(file);
			const trackInfo = { file: arrayBuffer, name: song.title };
			dispatch(ADD_SONGS([trackInfo]));
		}
	};

	// const saveOnDevice = () => {

	// }

	return (
		<div className={`flex items-center ${className}`} onClick={onClick}>
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
				<div className="ml-auto">
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

					{/* <MyIconBtn
						size="sm"
						variant="outlined"
						onClick={e => {
							e.stopPropagation();
							saveOnDevice();
						}}
					>
						<i className="fa-solid fa-floppy-disk"></i>
					</MyIconBtn> */}
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
		</div>
	);
};

export default AudioItem;
