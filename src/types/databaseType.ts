export enum fetch {
  success = 201,
  error = 400
}

export type TInitialState = {
  loading: boolean
  error: string
  hierarchy: Array<THierarchy>
  inventory: Array<TInventory>,
  currentInventory: Array<TInventory>,
  isRoom: string
  currentName: string
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

export type TAddInventory = {
  id: string
  name: string
  count: number
}
