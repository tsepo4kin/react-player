interface IShowToast {
  text: string;
  type: ToastType;
}

export enum ToastType {
  Error = 'error',
  Success = 'success',
  Warning = 'warning',
  Info = 'info'
};
export type ToastedController = ({ text, type }: IShowToast) => void