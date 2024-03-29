import { FC } from 'react'
import { IconButton, IconButtonProps } from '@material-tailwind/react'

interface IIconBtn extends IconButtonProps {
	onPointerEnterCapture?: () => void
	onPointerLeaveCapture?: () => void
}

const MyInputText: FC<IIconBtn> = ({
	variant,
	size,
	color,
	children,
	onChange,
	onPointerEnterCapture,
	onPointerLeaveCapture
}) => {
	return (
		<IconButton
			className="text-base"
			variant={variant}
			size={size}
			color={color}
			placeholder
			onChange={onChange}
			onPointerEnterCapture={onPointerEnterCapture}
			onPointerLeaveCapture={onPointerLeaveCapture}
		>
			{children}
		</IconButton>
	)
}

export default MyInputText
