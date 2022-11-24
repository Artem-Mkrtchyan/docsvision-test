import React, { useEffect } from 'react'
import { NodeContainer } from '../../components/NodeContainer/NodeContainer';
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchInvectory, fetchPlaces } from '../../store/actions/actionPlace';
import { selectors } from '../../store/selectors';

export const MainPage: React.FC = () => {

  const dispatch = useAppDispatch();
  const hierarchy = useAppSelector(selectors.getHierarchy)
  const inventory = useAppSelector(selectors.getInventory)
  const currentInventory = useAppSelector(selectors.getCurrInven)


  useEffect(() => {
    dispatch(fetchPlaces())
    dispatch(fetchInvectory())
  }, [])

  return (
    <section>
      {!hierarchy && !inventory ?
        <p>No found</p>
        :
        <NodeContainer arr={hierarchy} inventory={inventory} />
      }
      {
        currentInventory && currentInventory.map(item => <p>{`${item.name} ${item.count}`}</p>)
      }
    </section>
  )
}
