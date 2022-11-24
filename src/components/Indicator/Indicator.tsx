import React, { memo } from "react"
import { TInvectory } from "../../types/databaseType"

interface IProps {
  indicator: Array<TInvectory>
}

export const Indicator = memo<IProps>(({ indicator }) => {
  if (indicator.length === 0) return null

  return <span>{indicator.length}</span>
})
