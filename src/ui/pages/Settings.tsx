import MySwitch from '../components/mySwitch/mySwitch';

const Settings = () => {
	return (
		<div className="h-full w-full px-8 py-2">
			<div className="flex flex-col">
				{/* <p>Settings page description</p> */}
				<MySwitch label="Dark mode" />

				<a
					className="text-sm flex items-center mt-4"
					href="https://github.com/tsepo4kin/pwa-player"
				>
					<i className="fa-brands fa-github text-2xl"></i>
					<span className="ml-2">GitHub source code</span>
				</a>

				{/* <a href="#">bug report</a> */}
			</div>
		</div>
	);
};

export default Settings;
