import {
	IconButton,
	Menu,
	MenuHandler,
	MenuItem,
	MenuList
} from '@material-tailwind/react';
import { FC, PropsWithChildren } from 'react';

interface IMenuProps {
	items: Array<{
		text: string;
		disabled?: boolean;
		onClick?: Function;
	}>;
}

const MyMenu: FC<PropsWithChildren<IMenuProps>> = ({ children, items }) => {
	return (
		<Menu>
			<MenuHandler>
				<IconButton size="sm" variant="outlined">
					{children}
				</IconButton>
			</MenuHandler>
			<MenuList>
				{items.map((item, i) => (
					<MenuItem
						key={i}
						disabled={item.disabled}
						onClick={e => {
							e.stopPropagation();
							if (typeof item.onClick === 'function') item.onClick();
						}}
					>
						{item.text}
					</MenuItem>
				))}
			</MenuList>
		</Menu>
	);
};

export default MyMenu;
