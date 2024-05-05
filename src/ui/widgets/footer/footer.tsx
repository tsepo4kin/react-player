import { FC } from 'react';
import MyIconBtn from '../../components/myIconBtn/myIconBtn';
import Player from '../player/player';
import { useLocation, useNavigate } from 'react-router-dom';

const footerMenu = [
	{ icon: 'fa-solid fa-gear', href: '/settings' },
	// { icon: 'fa-regular fa-circle-play', href: '/player' },
	{ icon: 'fa-solid fa-magnifying-glass', href: '/search' },
	{ icon: 'fa-solid fa-house', href: '/' }
];

const Footer: FC = () => {
	const navigate = useNavigate();
	let location = useLocation();

	return (
		<footer className="w-full mb-auto py-2 px-4">
			<Player></Player>
			<div className="w-full flex justify-center pt-2">
				{footerMenu.map((menuItem, idx) => (
					<MyIconBtn
						onClick={() => navigate(menuItem.href)}
						key={idx}
						variant={location.pathname === menuItem.href ? 'filled' : 'text'}
						className="mx-4"
						size="lg"
					>
						<i className={menuItem.icon}></i>
					</MyIconBtn>
				))}
			</div>
		</footer>
	);
};

export default Footer;
