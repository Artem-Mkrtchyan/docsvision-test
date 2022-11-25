import React, { memo } from "react"
import { TInventory } from "../../types/databaseType"
import styles from './Indicator.module.css'

interface IProps {
  indicator: Array<TInventory>
}

export const Indicator = memo<IProps>(({ indicator }) => {
  if (indicator.length === 0) return null

  return <span className={styles.count}>{indicator.length}</span>
})
