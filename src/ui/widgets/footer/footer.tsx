import { FC } from 'react'
// import MyIconBtn from '../../components/myIconBtn/myIconBtn'
import Player from '../player/player'

// const footerMenu = [
// 	{ icon: 'fa-solid fa-gear', href: '/settings' },
// 	{ icon: 'fa-regular fa-circle-play', href: '/player' },
// 	{ icon: 'fa-solid fa-music', href: '/library' },
// 	{ icon: 'fa-solid fa-house', href: '/' }
// ]

interface IFooterProps {
	currentTrack: MediaSource | null
}

const Footer: FC<IFooterProps> = ({ currentTrack }) => {
	return (
		<footer className="w-full mb-auto py-2 px-4">
			<Player currentTrack={currentTrack}></Player>
			{/* <div className="w-full flex justify-center pt-2">
				{footerMenu.map((menuItem, idx) => (
					<a href={menuItem.href} key={idx}>
						<MyIconBtn variant="text" className="mx-4" size="sm">
							<i className={menuItem.icon}></i>
						</MyIconBtn>
					</a>
				))}
			</div> */}

		</footer>
	)
}

export default Footer
