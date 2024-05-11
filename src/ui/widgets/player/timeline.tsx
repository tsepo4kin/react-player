import { FC, useEffect, useState } from 'react';
import MySlider from '../../components/mySlider/mySlider';
import { formatTime } from '../../../utils/indexedDb';

interface ITimlineProps {
	disabled: boolean;
	currentTime: number;
	duration: number;
	onChange: (e: any) => void;
}

const Timeline: FC<ITimlineProps> = ({
	disabled,
	currentTime,
	duration,
	onChange
}) => {
	const [value, setValue] = useState(0);

	useEffect(() => {
		if (disabled) return;

		const newValue = Math.round((100 * currentTime) / duration) || 0;
		setValue(newValue);
	}, [currentTime, duration]);

	return (
		<div className="w-full flex px-1">
			<span className="whitespace-nowrap">{formatTime(currentTime)}</span>
			<MySlider
				className="w-full mx-2"
				disabled={disabled}
				value={value}
				onChange={onChange}
			/>
			<span className="whitespace-nowrap">{formatTime(duration)}</span>
		</div>
	);
};

export default Timeline;
