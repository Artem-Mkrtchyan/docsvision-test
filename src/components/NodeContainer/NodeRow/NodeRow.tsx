import React from 'react';
import { TInventory } from '../../../types/databaseType';
import styles from './NodeRow.module.css'

type TProps = {
  children: React.ReactNode
  currentInventory: Array<TInventory>
  onClick: (arr: Array<TInventory>) => void
}

export const NodeRow: React.FC<TProps> = ({children, currentInventory, onClick}) => {
  return (
    <div className={styles.nodeRow} onClick={() => onClick(currentInventory)}>
      {children}
    </div>
  )
}
