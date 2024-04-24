import { FC } from 'react';
import MyIconBtn from '../../components/myIconBtn/myIconBtn';
import Player from '../player/player';
import { useNavigate } from 'react-router-dom';

const footerMenu = [
	{ icon: 'fa-solid fa-gear', href: '/settings' },
	{ icon: 'fa-regular fa-circle-play', href: '/player' },
	{ icon: 'fa-solid fa-music', href: '/library' },
	{ icon: 'fa-solid fa-magnifying-glass', href: '/search' },
	{ icon: 'fa-solid fa-house', href: '/' }
];

const Footer: FC = () => {
	const navigate = useNavigate();

	return (
		<footer className="w-full mb-auto py-2 px-4">
			<Player></Player>
			<div className="w-full flex justify-center pt-2">
				{footerMenu.map((menuItem, idx) => (
					<MyIconBtn
						onClick={() => navigate(menuItem.href)}
						key={idx}
						variant="text"
						className="mx-4"
						size="md"
					>
						<i className={menuItem.icon}></i>
					</MyIconBtn>
				))}
			</div>
		</footer>
	);
};

export default Footer;
