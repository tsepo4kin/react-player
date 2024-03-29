import { FC, PropsWithChildren } from 'react'
import styles from './header.module.scss'

export interface IHeaderProps {}

const Header: FC<PropsWithChildren<IHeaderProps>> = ({ children }) => {
	return <header className={styles.header}>Header</header>
}

export default Header
