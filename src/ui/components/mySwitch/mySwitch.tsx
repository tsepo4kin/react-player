import { FC, PropsWithChildren } from 'react'
import { Switch, SwitchProps } from '@material-tailwind/react'

interface IInput extends SwitchProps {
	onPointerEnterCapture?: () => void
	onPointerLeaveCapture?: () => void
}

const MySwitch: FC<PropsWithChildren<IInput>> = ({
	color,
	label,
	disabled,
	onChange,
	onPointerEnterCapture,
	onPointerLeaveCapture
}) => {
	return (
		<Switch
			crossOrigin
			color={color}
			label={label}
			disabled={disabled}
			onChange={onChange}
			onPointerEnterCapture={onPointerEnterCapture}
			onPointerLeaveCapture={onPointerLeaveCapture}
		/>
	)
}

export default MySwitch
