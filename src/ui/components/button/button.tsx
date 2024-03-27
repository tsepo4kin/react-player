import { FC, PropsWithChildren } from 'react'
import styles from './button.module.scss'

interface IButton {
	onClick?: () => void
	variant?: 'primary' | 'secondary' | 'outlined' | 'text'
	size?: 's' | 'm' | 'l' | 'icon'
	before?: React.ReactNode
	loading?: boolean
	disabled?: boolean
}

const stylesSize = {
	s: styles['Button--size-s'],
	m: styles['Button--size-m'],
	l: styles['Button--size-l'],
	icon: styles['Buttin--size-icon']
}

const stylesVariant = {
	primary: styles['Button--variant-primary'],
	secondary: styles['Button--variant-secondary'],
	outlined: styles['Button--variant-outlined'],
	text: styles['Button--variant-text']
}

const classNames = (args: Array<string>) => {
	return args.join(' ')
}

const Button: FC<PropsWithChildren<IButton>> = ({
	variant = 'primary',
	size = 's',
	before,
	loading,
	disabled,
	children,
	onClick
}) => {
	return (
		<button
			className={classNames([
				styles['Button'],
				stylesVariant[variant],
				stylesSize[size]
      ])}
      disabled={disabled}
			onClick={loading ? undefined : onClick}
		>
      {loading && <span>крутилка</span>}
      {before && <span>{before}</span>}
			{!loading && <span>{children}</span>}
		</button>
	)
}

export default Button
