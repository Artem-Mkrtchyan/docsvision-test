import React from 'react';
import styles from './NodeRow.module.css'

type TProps = {
  children: React.ReactNode
}

export const NodeRow: React.FC<TProps> = ({children}) => {
  return (
    <div className={styles.nodeRow}>
      {children}
    </div>
  )
}
