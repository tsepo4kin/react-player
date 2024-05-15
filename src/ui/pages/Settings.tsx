import { useSelector } from 'react-redux';
import MySwitch from '../components/mySwitch/mySwitch';
import { useEffect, useState } from 'react';
import { getReadableFileSizeString } from '../../infrastructure/controllers/storage.conrollers';
import MyChip from '../components/myChip/myChip';

const Settings = () => {
	const [totalSize, setTotalSize] = useState('0');
	const songs = useSelector((state: any) => state.songs);

	useEffect(() => {
		getTotalSize();
	}, []);

	const getTotalSize = () => {
		let size = 0;
		songs.forEach((s: { file: ArrayBuffer }) => (size += s.file.byteLength));
		setTotalSize(getReadableFileSizeString(size));
	};

	return (
		<div className="h-full w-full px-8 py-2">
			<div className="flex flex-col">
				<div className="my-4 flex">
					<span className="pr-8 font-medium">Используемое пространство</span>
					<MyChip
						className="block rounded-full"
						variant="ghost"
						color='green'
						value={totalSize}
					/>
				</div>
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
