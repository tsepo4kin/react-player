import { FC, PropsWithChildren, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { ADD_SONGS } from '../../../redux'
import MyIconBtn from '../../components/myIconBtn/myIconBtn'
import { blobToArrayBuffer } from '../../../utils/indexedDb'

export interface IHeaderProps {}

const Header: FC<PropsWithChildren<IHeaderProps>> = () => {
	const input = useRef<HTMLInputElement | null>(null)
	const dispatch = useDispatch()

	const addSongs = () => {
		if (input.current) {
			const filePicker: HTMLInputElement = input.current!
			filePicker.click()
		}
	}

	const onInputFile = async (files) => {
		const res = [];
		for (let file of files) {
			const arrayBuffer = await blobToArrayBuffer(file)
			const trackInfo = {file: arrayBuffer, name: file.name}
			res.push(trackInfo)
		}
		dispatch(ADD_SONGS(res))
	}

	return (
		<header className="px-2 py-2 w-full">
			<div className="flex justify-end">
				<MyIconBtn size="sm" variant="outlined" onClick={addSongs}>
					<i className="fa-solid fa-upload"></i>
				</MyIconBtn>
			</div>
			<input
				hidden
				multiple
				type="file"
				ref={input}
				accept="audio/mp3,audio/wav,audio/ogg"
				onChange={e => {
					onInputFile(e.target.files)
				}}
			/>
		</header>
	)
}

export default Header
