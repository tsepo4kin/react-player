import {} from '@material-tailwind/react';

type EventCapture = {
	onPointerEnterCapture?: unknown;
	onPointerLeaveCapture?: unknown;
	placeholder?: unknown;
};

declare module '@material-tailwind/react' {
	export interface ButtonProps extends EventCapture {
	}
	export interface InputProps extends EventCapture {
		crossOrigin?: unknown;
	}
	export interface SelectProps extends EventCapture {
	}

	export interface CheckboxProps extends EventCapture {
		crossOrigin?: unknown;
	}

	export interface IconButtonProps extends EventCapture {
	}

	export interface SwitchProps extends EventCapture {
		crossOrigin?: unknown;
	}

	export interface SelectProps {
		children?: any;
	}

	export interface MenuListProps extends EventCapture {
		children?: any;
	}

	export interface MenuItemProps extends EventCapture {
	}

	export interface ProgressProps extends EventCapture {
	}

	export interface DialogProps extends EventCapture {
	}

	export interface DialogHeaderProps extends EventCapture {
	}

	export interface DialogBodyProps extends EventCapture {
		children?: any;
	}

	export interface DialogFooterProps extends EventCapture {
	}

}
