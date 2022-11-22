import { createHierarchyTree } from './../../utils/helperFunc';
import { firebaseAPI } from '../../firebase/API'
import { THierarchy, TPlace } from '../../types/databaseType'
import { placesSlice } from '../slices/placesSlice'
import { AppDispatch } from '../store'

export const fetchPlaces = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(placesSlice.actions.fetching())

    const response = await firebaseAPI.getPlaces()

    const places: Array<TPlace> = response.map((place: TPlace) => ({
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
    dispatch(placesSlice.actions.setError(''))
  } catch (error) {
    dispatch(placesSlice.actions.setError('Fetch error'))
  }
}
