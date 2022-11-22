import React, { useEffect } from 'react'
import { firebaseAPI } from '../../firebase/API'
import { useAppDispatch } from '../../hooks/redux'
import { fetchPlaces } from '../../store/actions/actionPlace';


export const UsersPage: React.FC = () => {
  const dispatch = useAppDispatch();

  firebaseAPI.getInventory().then(resp => console.log(resp))

  useEffect(()=>{
    dispatch(fetchPlaces())
  }, [])
  return (
   <section></section>
  )
}
