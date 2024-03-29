import { FC } from 'react'
import { Input, InputProps } from '@material-tailwind/react'

interface IInput extends InputProps {
	onPointerEnterCapture?: () => void
	onPointerLeaveCapture?: () => void
}

const MyInputText: FC<IInput> = ({
	variant,
	size,
	color,
	label,
	error,
	success,
	icon,
	onChange,
	onPointerEnterCapture,
	onPointerLeaveCapture
}) => {
	return (
		<Input
			crossOrigin
			variant={variant}
			size={size}
			color={color}
			label={label}
			error={error}
			success={success}
			icon={icon}
			onChange={onChange}
			onPointerEnterCapture={onPointerEnterCapture}
			onPointerLeaveCapture={onPointerLeaveCapture}
		/>
	)
}

export default MyInputText
