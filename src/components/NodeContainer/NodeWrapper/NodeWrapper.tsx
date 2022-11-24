import React from 'react';
import styles from './NodeWrapper.module.css'

type TProps = {
  children: React.ReactNode
}

export const NodeWrapper: React.FC<TProps> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.treeWrap}>
          {children}
        </div>
      </div>
    </div>
  )
}
