import React from 'react'
import styles from './InventoryTable.module.css'

type TProps = {
  children: React.ReactNode
}

export const InventoryTable: React.FC<TProps> = ({ children }) => {

  const headerCell = ['Действие', 'Наименование', 'Кол-во']

  return (
    <table className={styles.table}>
      <thead className={styles.header}>
        <tr className={styles.row}>
        {headerCell.map(cellName => <th key={cellName} className={styles.cell}>{cellName}</th>)}
        </tr>
      </thead>
      <tbody className={styles.bodyTable}>
        {children}
      </tbody>
    </table>
  )
}
