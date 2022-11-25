import React, { useState } from 'react'
import classNames from 'classnames'
import styles from './InventoryRow.module.css'

type TProps = {
  name: string
  count: number
  id: string
  deleteInv: (id: string) => void
  updataInventory: (id:string, data: {name: string, count: number}) => void
  isRoom: string
}

export const InventoryRow: React.FC<TProps> = ({ count, name, id, deleteInv, isRoom, updataInventory }) => {

  const [edit, setEdit] = useState(false)
  const [nameInput, setNameInput] = useState(name)
  const [countInput, setCountInput] = useState(count)

  const editMode = () => {
    setEdit(true)
  }

  const onInputChange = {
    onInputNameChange (e: React.ChangeEvent<HTMLInputElement>) {
      setNameInput(e.currentTarget.value)
    },
    onInputCountChange (e: React.ChangeEvent<HTMLInputElement>) {
      setCountInput(+e.currentTarget.value)
    }
  }

  const submit = () => {
    if(nameInput !== name || countInput !== count) {
      updataInventory(id, {name:nameInput, count: countInput})
      setEdit(false)
    }

    setEdit(false)
  }

  const inputClass = classNames({
    [styles.input]: true,
    [styles.inputEdit]: edit
  })

  return (
    <tr className={styles.row}>
      <td className={styles.cell}>
        {!!isRoom && <div className={styles.buttonWrap}>
          {edit
            ? <button className={`${styles.btn} ${styles.btnSubmit}`} onClick={submit}>Готово</button>
            : <button className={`${styles.btn} ${styles.btnEdit}`} onClick={editMode}>Изменить</button>
          }
          <button className={`${styles.btn} ${styles.btnDelete}`} onClick={() => deleteInv(id)}>Удалить</button>
        </div>}
      </td>
      <td className={styles.cell}>
        <input className={inputClass} type="text" value={nameInput} onChange={onInputChange.onInputNameChange} disabled={!edit} />
      </td>
      <td className={styles.cell}>
        <input className={inputClass}  type="number" value={countInput} onChange={onInputChange.onInputCountChange} disabled={!edit} />
      </td>
    </tr>
  )
}
