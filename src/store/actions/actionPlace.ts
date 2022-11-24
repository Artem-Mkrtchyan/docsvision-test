import { createHierarchyTree } from './../../utils/helperFunc';
import { firebaseAPI } from '../../firebase/API'
import { THierarchy, TInventory, TPlace } from '../../types/databaseType'
import { placesSlice } from '../slices/placesSlice'
import { AppDispatch } from '../store'

export const fetchPlaces = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(placesSlice.actions.fetching())

    const response: Array<TPlace> = await firebaseAPI.getPlaces()

    const places: Array<TPlace> = response.map((place) => ({
      name: place.name,
      id: place.id,
      parts: place.parts === undefined ? [] : place.parts,
    }))

    const hierarchy: Array<TPlace> = []

    places.forEach((place: TPlace) => {
      if (place.id.indexOf('-') === -1) {
        hierarchy.push(place)
      }
    })

    const hierarchyWithNodes: Array<THierarchy> = createHierarchyTree(hierarchy, places)

    dispatch(placesSlice.actions.setPlaces(hierarchyWithNodes))
  } catch (error) {
    dispatch(placesSlice.actions.setError('Fetch places error'))
  }
}

export const fetchInvectory = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(placesSlice.actions.fetching())

    const response = await firebaseAPI.getInventory();

    const inventory = response.map((inventory) => ({
      name: inventory.data.name,
      count: +inventory.data.count,
      id: inventory.id,
      placeId: inventory.placeId,
    }))

    dispatch(placesSlice.actions.setInvectory(inventory))
  } catch (error) {
    dispatch(placesSlice.actions.setError('Fetch invectory error'))
  }

}

export const setCurrentInventory = (arr: Array<TInventory>) => (dispatch: AppDispatch) => {
  dispatch(placesSlice.actions.setCurrentInventory(arr))
}
