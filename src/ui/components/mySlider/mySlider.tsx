const mySlider = ({ disabled, value, onChange, className }) => {
	return (
		<input
			disabled={disabled}
			className={[className, 'w-full cursor-pointer'].join(' ')}
			type="range"
			min={0}
			max={100}
			value={value}
			onChange={onChange}
		/>
	);
};

export default mySlider;
