import { FC } from 'react';
import MySlider from '../../components/mySlider/mySlider';
import { formatTime } from '../../../utils/indexedDb';

interface ITimlineProps {
	disabled: boolean;
	value: number;
	currenttime: number;
	duration: number;
	onChange: (e: any) => void;
}

const Timeline: FC<ITimlineProps> = props => {
	return (
		<div className="w-full flex px-1">
			<span className="whitespace-nowrap">{formatTime(props.currenttime)}</span>
			<MySlider
				className="w-full mx-2"
				disabled={props.disabled}
				value={props.value}
				onChange={props.onChange}
			/>
			<span className="whitespace-nowrap">{formatTime(props.duration)}</span>
		</div>
	);
};

export default Timeline;
