import { FC, PropsWithChildren, ReactNode, useState } from 'react';
import {
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader
} from '@material-tailwind/react';
import MyButton from '../myButton/myButton';
import MyIconBtn from '../myIconBtn/myIconBtn';

interface IDialogProps {
	title: string;
	openButton: ReactNode;
	showFooter: boolean;
	onClose: Function;
	onConfirm: Function;
}

interface IModalProps {
	title: string;
	onClose: Function;
	onConfirm: Function;
	showFooter: boolean;
	handleOpen: Function;
	open: boolean;
}

export const MyModal: FC<PropsWithChildren<IModalProps>> = props => {
	const confirm = () => {
		props.onConfirm();
		props.handleOpen();
	};

	const close = () => {
		props.onClose();
		props.handleOpen();
	};

	return (
		<Dialog open={props.open} handler={() => props.handleOpen()}>
			<DialogHeader>
				{props.title}
				<MyIconBtn
					size="sm"
					variant="text"
					className="ml-auto"
					onClick={() => props.handleOpen()}
				>
					<i className="fa-solid fa-xmark"></i>
				</MyIconBtn>
			</DialogHeader>
			<DialogBody>{props.children}</DialogBody>
			{props.showFooter && (
				<DialogFooter className="flex justify-center">
					<MyButton variant="filled" color="red" onClick={close} className="mr-1">
						<span>Закрыть</span>
					</MyButton>
					<MyButton variant="filled" color="green" onClick={confirm}>
						<span>Принять</span>
					</MyButton>
				</DialogFooter>
			)}
		</Dialog>
	);
};

export const MyDialog: FC<PropsWithChildren<IDialogProps>> = props => {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = () => setIsOpen(!isOpen);

	return (
		<>
			<div onClick={handleOpen}>{props.openButton}</div>
			<MyModal
				title={props.title}
				onClose={props.onClose}
				onConfirm={props.onConfirm}
				showFooter={props.showFooter}
				open={isOpen}
				handleOpen={setIsOpen}
			>
				{props.children}
			</MyModal>
		</>
	);
};
