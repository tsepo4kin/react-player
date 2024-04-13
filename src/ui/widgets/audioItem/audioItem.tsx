import { FC } from 'react'
import MyIconBtn from '../../components/myIconBtn/myIconBtn'
import { useDispatch } from 'react-redux'
import { ADD_SONGS, DELETE_SONG } from '../../../redux/actions'
import { getDownloadLink, downloadAudioFromLink } from '../../../api/api'

interface IAudioItem {
	song: any
	idx?: number
	className?: string
	canDelete?: boolean
	canDownload?: boolean
	onClick?: () => void
}

const AudioItem: FC<IAudioItem> = ({
	song,
	idx,
	className,
	canDelete = false,
	canDownload = false,
	onClick
}) => {
	const dispatch = useDispatch()

	const downloadAndSave = async () => {
		const ytLink = song.url.replace('/watch?v=', '')
		const metaData = await getDownloadLink(ytLink)
		const audioBlob = await downloadAudioFromLink(metaData.url)
		if (audioBlob) {
			const file = new File([audioBlob], song.title, {
				type: 'audio/mp3'
			})
			dispatch(ADD_SONGS([file]))
		}
	}

	return (
		<div className={`flex ${className}`} onClick={onClick}>
			<img
				className="rounded h-12 w-12 mr-2"
				src={
					song.thumbnail
						? song.thumbnail
						: 'https://i.pinimg.com/474x/d7/80/99/d780998902c6e43eee27b1cfc1469384.jpg'
				}
			/>
			<div className="flex flex-col w-full ">
				<p className="truncate">{(song && song.name) || song.title}</p>
				<p className="truncate">Song author</p>
			</div>
			{canDelete && idx !== undefined && (
				<div>
					<MyIconBtn
						size="sm"
						variant="outlined"
						onClick={e => {
							e.stopPropagation()
							console.log(song)
							dispatch(DELETE_SONG(idx))
						}}
					>
						<i className="fa-solid fa-trash-can"></i>
					</MyIconBtn>
				</div>
			)}

			{canDownload && (
				<div>
					<MyIconBtn
						size="sm"
						variant="outlined"
						onClick={e => {
							e.stopPropagation()
							downloadAndSave()
						}}
					>
						<i className="fa-solid fa-add"></i>
					</MyIconBtn>
				</div>
			)}
		</div>
	)
}

export default AudioItem
