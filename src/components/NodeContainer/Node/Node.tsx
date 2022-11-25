import React from 'react'
import styles from './Node.module.css'

type TProps = {
  children: React.ReactNode
}

export const Node: React.FC<TProps> = ({ children }) => {
  return (
    <div className={styles.node}>
     {children}
    </div>
  )
}
