import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { addInventory } from '../../store/actions/actionPlace'
import styles from './FormAddInventory.module.css'

type TProps = {
  room: string
}

type Inputs = {
  name: string
  count: number
}

export const FormAddInventory: React.FC<TProps> = ({room}) => {

  const { register, handleSubmit, reset } = useForm<Inputs>()

  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<Inputs> = (data) => {

    dispatch(addInventory({...data, id: room}))
    reset()
  }

  return (
    <form className={styles.from} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={styles.formTitle}>Добавить оборудование</h3>
      <div className={styles.formInner}>
        <div className={styles.inputGroup}>
          <label htmlFor="inpName">Наименование</label>
          <input className={styles.input} type="text" id='inpName' {...register('name')} />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="inpNum">Колличество</label>
          <input className={styles.input} type="number" id='inpNum' {...register('count')} />
        </div>
        <button className={styles.button} type='submit' >Добавить</button>
      </div>
    </form>
  )
}
