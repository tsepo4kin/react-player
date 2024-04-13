import { FC } from 'react'
import { Input, InputProps } from '@material-tailwind/react'

const MyInputText: FC<InputProps> = props => {
	return <Input {...props} />
}

export default MyInputText
