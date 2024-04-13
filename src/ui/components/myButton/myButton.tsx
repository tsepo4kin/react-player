import { FC, PropsWithChildren } from 'react'
import { Button } from '@material-tailwind/react'
import { ButtonProps } from '@material-tailwind/react/components/Button'

const MyButton: FC<PropsWithChildren<ButtonProps>> = ({
	variant = 'filled',
	size = 'md',
	loading,
	color,
	fullWidth,
	disabled,
	children,
	onClick,
	placeholder,
	className
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
			className={className}
		>
			{children}
		</Button>
	)
}

export default MyButton
