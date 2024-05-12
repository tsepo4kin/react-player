import { FC, PropsWithChildren } from 'react';
import { Progress, ProgressProps } from '@material-tailwind/react';

const MyProgress: FC<PropsWithChildren<ProgressProps>> = props => {
	return <Progress {...props} />;
};

export default MyProgress;
