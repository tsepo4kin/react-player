import { FC, PropsWithChildren } from 'react'
import { ICON_PATHS } from './icon-paths'
import styles from './icon.module.scss'

export type IconType = keyof typeof ICON_PATHS

export interface IconProps {
	icon: IconType
	className?: string
}

const Icon: FC<PropsWithChildren<IconProps>> = ({ icon }) => (
	<svg viewBox="0 0 24 24" className={styles.icon}>
		<path d={ICON_PATHS[icon]} />
	</svg>
)

export default Icon
