import { useSelector } from 'react-redux';
import MySwitch from '../components/mySwitch/mySwitch';
import { useEffect, useState } from 'react';
import {
	clearStorage,
	getReadableFileSizeString
} from '../../infrastructure/controllers/storage.conrollers';
import MyChip from '../components/myChip/myChip';
import MyButton from '../components/myButton/myButton';

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

	const clear = () => {
		const isConfirm = confirm(
			'Вы действительно хотите удалить все аудиозаписи?'
		);
		if (isConfirm) {
			clearStorage();
		}
	};

	const test = async () => {
		console.log('start');
		const root = await navigator.storage.getDirectory();
		console.log(root);
	};

	return (
		<div className="h-full w-full px-8 py-2">
			<div className="flex flex-col">
				<div className="my-4 flex">
					<span className="pr-8 font-medium">Используемое пространство</span>
					<MyChip
						className="block rounded-full"
						variant="ghost"
						color="green"
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

				{/* <MyButton className="mt-4" onClick={() => clear()} size="sm">
					Удалить всю аудио библиотеку
				</MyButton> */}

				<MyButton className="mt-4" onClick={() => test()} size="sm">
					tst
				</MyButton>
			</div>
		</div>
	);
};

export default Settings;
