import { FC, PropsWithChildren } from 'react'
import styles from './checkbox.module.scss'

interface ICheckbox {
  onChange?: () => void;
	children?: string
	disabled?: boolean
	checked?: boolean
}

const Checkbox: FC<PropsWithChildren<ICheckbox>> = ({
	checked = false,
  disabled,
  onChange,
	children
}) => {
	return (
		<label className={styles.check}>
      <input
        type='checkbox'
        className={styles.check__input}
        checked={checked}
        disabled={disabled}
        onChange={onChange ? onChange : undefined}
      ></input>
			{children}
		</label>
	)
}

export default Checkbox
