export type TInitialState = {
  loading: boolean
  error: string
  hierarchy: Array<THierarchy>
  invectory: Array<TInventory>,
  currentInventory: Array<TInventory>,
}

export type TPlace = {
  id: string;
  name: string;
  parts: Array<string>
}

export type TInventory = {
  name: string
  count: number
  id: string
  placeId: string
}

export type TInventoryResp = {
  id: string
  placeId: string
  data: {
    name: string
    count: number
  }
}

export type THierarchy = {
  id: string
  name: string
  parts: Array<THierarchy>
}
