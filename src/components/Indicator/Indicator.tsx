import React, { memo } from "react"
import { TInventory } from "../../types/databaseType"

interface IProps {
  indicator: Array<TInventory>
}

export const Indicator = memo<IProps>(({ indicator }) => {
  if (indicator.length === 0) return null

  return <span>{indicator.length}</span>
})
