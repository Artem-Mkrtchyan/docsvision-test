import { fetch, TAddInventory } from './../../types/databaseType'
import { createHierarchyTree, putAllSetsOfKeysWithData, extractKeysFromDependencies } from './../../utils/helperFunc'
import { firebaseAPI } from '../../firebase/API'
import { THierarchy, TInventory, TPlace } from '../../types/databaseType'
import { placesSlice } from '../slices/placesSlice'
import { AppDispatch, RootState } from '../store'

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

export const fetchInventory = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(placesSlice.actions.fetching())

    const response = await firebaseAPI.getInventory()

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

export const setRoom = (isRoom: string) => (dispatch: AppDispatch) => {
  dispatch(placesSlice.actions.setRoom(isRoom))
}

export const setCurrentName = (name: string) =>  (dispatch: AppDispatch) => {
  dispatch(placesSlice.actions.setCurrentName(name))
}

const _updateListCurrentInvetory = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  await dispatch(fetchInventory())

  const currentInventory = await putAllSetsOfKeysWithData(
    extractKeysFromDependencies(
      getState().main.isRoom,
      getState().main.hierarchy
    ),
    getState().main.inventory
  )

  dispatch(placesSlice.actions.setCurrentInventory(currentInventory))
}

export const addInventory = (data: TAddInventory) => async (dispatch: AppDispatch) => {
  dispatch(placesSlice.actions.fetching())
  firebaseAPI.addInventory(data)
    .then(resp => {
      if (resp.status === fetch.success) {
        dispatch(placesSlice.actions.setError(''))

        dispatch(_updateListCurrentInvetory())
        dispatch(placesSlice.actions.fetchingFalse())
      } else {
        throw Error('Не удалось добавить!')
      }
    })
    .catch((e) => {
      dispatch(placesSlice.actions.setError(e.message))
      dispatch(placesSlice.actions.fetchingFalse())
    })
}

export const deleteInventory = (id: string) => (dispatch: AppDispatch) => {
  dispatch(placesSlice.actions.fetching())
  firebaseAPI.deleteInventory(id)
    .then(resp => {
      if (resp.status === fetch.success) {
        dispatch(placesSlice.actions.setError(''))

        dispatch(_updateListCurrentInvetory())
        dispatch(placesSlice.actions.fetchingFalse())
      } else {
        throw Error('Ошибка в удалении элемента')
      }
    })
    .catch((e) => {
      dispatch(placesSlice.actions.setError(e.message))
      dispatch(placesSlice.actions.fetchingFalse())
    })
}

export const updataInventary = (id: string, data: { name: string, count: number }) => (dispatch: AppDispatch) => {
  dispatch(placesSlice.actions.fetching())
  Promise.all([
    firebaseAPI.deleteInventory(id),
    firebaseAPI.addInventory({ id, name: data.name, count: data.count })
  ]).then(([resp1, resp2]) => {
    if (resp1.status === fetch.success && resp2.status === fetch.success) {
      dispatch(_updateListCurrentInvetory)
      dispatch(placesSlice.actions.fetchingFalse())
    } else {
      throw Error('Ошибка в удалении элемента')
    }
  })
    .catch((e) => {
      dispatch(placesSlice.actions.setError(e.message))
      dispatch(placesSlice.actions.fetchingFalse())
    })
}
