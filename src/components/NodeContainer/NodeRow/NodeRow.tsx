import React from 'react'
import { TInventory } from '../../../types/databaseType'
import { Indicator } from '../../Indicator/Indicator'
import styles from './NodeRow.module.css'

type TProps = {
  nodeName: string
  currentInventory: Array<TInventory>
  onClick: (arr: Array<TInventory>) => void
}

export const NodeRow: React.FC<TProps> = ({ nodeName, currentInventory, onClick }) => {
  return (
    <div className={styles.nodeRow} onClick={() => onClick(currentInventory)}>
      <span className={styles.nodeName}>
        {nodeName}:
      </span>
      <Indicator indicator={currentInventory} />
    </div>
  )
}
