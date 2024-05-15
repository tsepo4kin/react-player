import { FC } from 'react';
import { Alert } from '@material-tailwind/react';
import { createRoot } from 'react-dom/client';
import { ToastType, ToastedController } from '../../../infrastructure/controllers/notification.controllers';

interface IToastProps {
	type: string;
	deleteToast: () => void;
	text: string;
}

const getColor = (type: string) => {
	switch (type) {
		case ToastType.Success:
			return 'green';
		case ToastType.Warning:
			return 'orange';
		case ToastType.Error:
			return 'red';
		case ToastType.Info:
			return 'light-blue';
	}
};

const MyToast: FC<IToastProps> = ({ type, deleteToast, text }) => {
	return (
		<div className="w-full px-2 py-2">
			<Alert onClose={() => deleteToast()} color={getColor(type)}>
				{text}
			</Alert>
		</div>
	);
};

const showNotification: ToastedController = ({ text, type }) => {
	const toastContainer = document.getElementById('toasted__container');

	const toastedWrapper = document.createElement('div');
	toastContainer!.appendChild(toastedWrapper);

	const root = createRoot(toastedWrapper);

	root.render(
		<MyToast
			text={text}
			type={type}
			deleteToast={() => toastContainer!.removeChild(toastedWrapper)}
		/>
	);

	setTimeout(() => {
		try {
			toastContainer!.removeChild(toastedWrapper);
		} catch (e) {
			console.log('already deleted');
		}
	}, 3000);
};

export default showNotification;
