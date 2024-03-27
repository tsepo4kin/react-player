import { FC, PropsWithChildren } from "react";
import styles from './inputText.module.scss'

interface IInput {}

const InputText: FC<PropsWithChildren<IInput>> = ({}) => {
  return (<input className={styles.input}></input>)
}

export default InputText;