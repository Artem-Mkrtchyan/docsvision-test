import React from 'react'
import { Container } from '../Container/Container'
import styles from './Main.module.css'

type TProps = {
  children: React.ReactNode
}

export const Main: React.FC<TProps> = ({ children }) => {
  return (
    <main className={styles.main}>
      <Container>
        {children}
      </Container>
    </main>
  )
}
