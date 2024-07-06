import MyIconBtn from '../../components/myIconBtn/myIconBtn';
import { FC } from 'react';
import { usePlayer } from '../../hooks/usePlayer';

const ControlGroup: FC<{ name: string }> = ({ name }) => {
	const { playerController, playerState, setPlayerState } = usePlayer();
	const playPause = () => {
		playerController.playPause();
		setPlayerState({ ...playerController.getPlayerData() });
	};

	return (
		<div className="bg-zinc-400/15 flex items-center h-full w-full px-10 py-5">
			<MyIconBtn
				size="md"
				variant="text"
				onClick={e => {
					e.stopPropagation();
					playPause();
				}}
			>
				{playerState.isPlayed ? (
					<i className="fa-solid fa-pause" />
				) : (
					<i className="fa-solid fa-play" />
				)}
			</MyIconBtn>
			<p className="truncate font-medium ml-4">{name}</p>
		</div>
	);
};

export default ControlGroup;
