import React from 'react'
import styles from './Preloader.module.css'

export const Preloader: React.FC = () => {
  return (
    <span className={styles.backSide}>
      <div className={styles.ldsRoller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </span>
  )
}
