import React, { useEffect } from 'react'
import { FormAddInventory } from '../../components/FormAddInventory/FromAddInventory'
import { InventoryRow } from '../../components/InventoryTable/InventoryRow/InventoryRow'
import { InventoryTable } from '../../components/InventoryTable/InventoryTable'
import { NodeContainer } from '../../components/NodeContainer/NodeContainer'
import { Preloader } from '../../components/Preloader/Preloader'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { deleteInventory, fetchInventory, fetchPlaces, updataInventary } from '../../store/actions/actionPlace'
import { selectors } from '../../store/selectors'
import styles from './MainPage.module.css'

export const MainPage: React.FC = () => {

  const dispatch = useAppDispatch()
  const { hierarchy, inventory, currentInventory, loading, isRoom, currentName } = useAppSelector(selectors.getMainPage)

  useEffect(() => {
    dispatch(fetchPlaces())
    dispatch(fetchInventory())
  }, [])

  const deleteInv = (id: string) => {
    dispatch(deleteInventory(id))
  }

  const updataInvSubmit = (id:string, data: {name: string, count: number}) => {
    dispatch(updataInventary(id, data))
  }

  return (
    <section className={styles.inventorySection}>
      {loading && <Preloader />}

      <div className={styles.sectionList}>
        {!hierarchy && !inventory ?
          <p>No found</p>
          :
          <NodeContainer arr={hierarchy} inventory={inventory} />
        }
      </div>

      <div className={styles.wrapperTable}>
      {currentName && <h2 className={styles.inventoryTitle}>{currentName}</h2>}
        <InventoryTable>
          {!!currentInventory.length
            ? currentInventory.map(inv => (
              <InventoryRow
                key={inv.id}
                count={inv.count}
                name={inv.name}
                id={inv.id}
                deleteInv={deleteInv}
                isRoom={isRoom}
                updataInventory={updataInvSubmit}
              />))
            : <tr><td>Not found</td></tr>
          }
        </InventoryTable>

        {isRoom && <FormAddInventory room={isRoom} />}
      </div>
    </section>
  )
}
