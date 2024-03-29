import { FC, PropsWithChildren } from 'react'
import { Button, ButtonStyleTypes } from '@material-tailwind/react'
import {
	color,
	size,
	variant
} from '@material-tailwind/react/types/components/button'

interface IButton extends ButtonStyleTypes {
	onClick?: () => void
	variant?: variant
	size?: size
	color?: color
	loading?: boolean
	disabled?: boolean
	fullWidth?: boolean 
	placeholder?: string
	onPointerEnterCapture?: () => void,
	onPointerLeaveCapture?: () => void
}

const MyButton: FC<PropsWithChildren<IButton>> = ({
	variant = 'filled',
	size = 'md',
	loading,
	color,
	fullWidth,
	disabled,
	children,
	onClick,
	placeholder,
	onPointerEnterCapture,
	onPointerLeaveCapture,
}) => {
	return (
		<Button
			variant={variant}
			size={size}
			color={color}
			fullWidth={fullWidth}
			disabled={disabled}
			loading={loading}
			onClick={onClick}
			placeholder={placeholder}
			onPointerEnterCapture={onPointerEnterCapture}
			onPointerLeaveCapture={onPointerLeaveCapture}
		>
			{children}
		</Button>
	)
}

export default MyButton

