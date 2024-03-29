import { FC } from 'react'
import { Checkbox, CheckboxProps } from '@material-tailwind/react'

interface ICheckbox extends CheckboxProps {
	onPointerEnterCapture?: () => void
	onPointerLeaveCapture?: () => void
}

const MyCheckbox: FC<ICheckbox> = ({
	color,
	label,
	icon,
	disabled,
	onChange,
	onPointerEnterCapture,
	onPointerLeaveCapture
}) => {
	return (
		<Checkbox
			crossOrigin
			color={color}
			label={label}
			icon={icon}
			disabled={disabled}
			onChange={onChange}
			onPointerEnterCapture={onPointerEnterCapture}
			onPointerLeaveCapture={onPointerLeaveCapture}
		/>
	)
}

export default MyCheckbox
