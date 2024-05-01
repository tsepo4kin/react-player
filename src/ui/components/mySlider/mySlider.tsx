import { FC } from 'react';

interface ISliderProps {
	disabled: boolean;
	value: number;
	onChange: (e: any) => void;
	className?: string;
}

const mySlider: FC<ISliderProps> = ({
	disabled,
	value,
	onChange,
	className
}) => {
	return (
		<input
			disabled={disabled}
			className={[className, 'cursor-pointer'].join(' ')}
			type="range"
			min={0}
			max={100}
			value={value}
			onChange={onChange}
		/>
	);
};

export default mySlider;
