import { FC } from 'react'
import { Chip, ChipProps } from '@material-tailwind/react'

const MyChip: FC<ChipProps> = props => {
	return <Chip  {...props} />
}

export default MyChip
