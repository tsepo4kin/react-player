import { FC, PropsWithChildren } from 'react'
import { Switch, SwitchProps } from '@material-tailwind/react'

const MySwitch: FC<PropsWithChildren<SwitchProps>> = props => {
	return <Switch {...props} />
}

export default MySwitch
