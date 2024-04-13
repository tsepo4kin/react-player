import { FC } from 'react'
import { IconButton, IconButtonProps } from '@material-tailwind/react'

const MyIconBtn: FC<IconButtonProps> = ({
	variant,
	size,
	color,
	children,
	className,
	onClick
}) => {
	return (
		<IconButton
			className={`text-base ${className}`}
			variant={variant}
			size={size}
			color={color}
			onClick={onClick}
		>
			{children}
		</IconButton>
	)
}

export default MyIconBtn
