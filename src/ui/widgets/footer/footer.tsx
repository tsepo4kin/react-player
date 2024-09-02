import { FC, useEffect, useRef } from 'react';
import MyIconBtn from '../../components/myIconBtn/myIconBtn';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	createMediaSession,
	playerController
} from '../../../infrastructure/controllers/player.controllers';
import { arrayBufferToBlob } from '../../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { LoopState } from '../../../domain/models/player';
import { SET_SELECTED_AUDIO_ID } from '../../../infrastructure/redux';

const footerMenu = [
	{ icon: 'fa-solid fa-gear', href: '/settings' },
	{ icon: 'fa-regular fa-circle-play', href: '/player' },
	{ icon: 'fa-solid fa-magnifying-glass', href: '/search' },
	{ icon: 'fa-solid fa-house', href: '/' }
];

const Footer: FC = () => {
	const navigate = useNavigate();
	let location = useLocation();
	const audioId = useSelector(
		(state: any) => state.currentAudio?.selectedAudioId
	);
	const songs = useSelector((state: any) => state.songs);
	const audioRef = useRef<HTMLAudioElement>(new Audio());
	const {createSession, clearSession} = createMediaSession(onPrev, onNext);
	const dispatch = useDispatch();

	useEffect(() => {
		if (audioId >= 0) {
			const blob = arrayBufferToBlob(songs[audioId].file, 'audio/mp3');
			const audio = { file: blob, name: songs[audioId].name };
			audioRef.current!.title = audio.name;
			audioRef.current!.src = URL.createObjectURL(audio.file);
			playerController.setAudioElement(audioRef.current!);
			playerController.playPause(true);
			createSession();
			playerController.setOnEnd(onSongEnd.bind(this)); // ???
			playerController.setNext(onNext);
			playerController.setPrev(onPrev);
		}
		return () => {
			if (audioRef?.current?.src) {
				URL.revokeObjectURL(audioRef.current.src);
			}
			clearSession();
		};
	}, [audioId, audioRef]);

	function onNext() {
		if (audioId < songs.length - 1) {
			dispatch(SET_SELECTED_AUDIO_ID(audioId + 1));
		} else if (
			audioId === songs.length - 1 &&
			playerController.getPlayerData().loopState === 1
		) {
			dispatch(SET_SELECTED_AUDIO_ID(0));
		}
	}

	function onPrev() {
		if (playerController.getPlayerData().audioElement!.currentTime > 3) {
			playerController.setCurrentTime(0);
		} else if (audioId > 0) {
			dispatch(SET_SELECTED_AUDIO_ID(audioId - 1));
		}
	}

	const onSongEnd = () => {
		if (playerController.getPlayerData().loopState === LoopState.LoopOne) {
			audioRef.current?.play();
		} else {
			onNext();
		}
	};

	return (
		<footer className="w-full mb-auto py-2 px-4">
			<div className="w-full flex justify-center pt-2">
				{footerMenu.map((menuItem, idx) => (
					<MyIconBtn
						onClick={() => navigate(menuItem.href)}
						key={idx}
						variant={location.pathname === menuItem.href ? 'filled' : 'text'}
						className="mx-4"
						size="lg"
					>
						<i className={menuItem.icon}></i>
					</MyIconBtn>
				))}
			</div>
		</footer>
	);
};

export default Footer;
