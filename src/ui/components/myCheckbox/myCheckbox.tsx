import { FC } from 'react'
import { Checkbox, CheckboxProps } from '@material-tailwind/react'

const MyCheckbox: FC<CheckboxProps> = ({
	color,
	label,
	icon,
	disabled,
	onChange
}) => {
	return (
		<Checkbox
			color={color}
			label={label}
			icon={icon}
			disabled={disabled}
			onChange={onChange}
		/>
	)
}

export default MyCheckbox
