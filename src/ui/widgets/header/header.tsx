import { FC, PropsWithChildren, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { ADD_SONGS } from '../../../redux'
import MyIconBtn from '../../components/myIconBtn/myIconBtn'

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
					dispatch(ADD_SONGS(e.target.files))
				}}
			/>
		</header>
	)
}

export default Header
