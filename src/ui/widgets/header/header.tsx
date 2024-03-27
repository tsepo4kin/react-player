import { FC, PropsWithChildren } from 'react'
import styles from './header.module.scss'
import Button from '../../components/button/button'
import Icon from '../../components/icon/icon'

export interface IHeaderProps {
	title: string
	backButton: boolean
	hideSpacer: boolean
}

const Header: FC<PropsWithChildren<IHeaderProps>> = ({
	title,
	hideSpacer,
	backButton = false,
	children
}) => {
	return (
		<header className={styles.header}>
			<div className={styles.content}>
				{backButton && (
					<Button>
						<Icon icon="backArrow" />
					</Button>
				)}

				{title && <h1 className={styles.title}>{title}</h1>}

				{!hideSpacer && <div className={styles.spacer} />}

				{children}
			</div>
		</header>
	)
}

export default Header
