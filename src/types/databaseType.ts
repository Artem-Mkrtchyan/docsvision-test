export type TInitialState = {
  loading: boolean
  error: string
  hierarchy: Array<THierarchy>
  invectory: Array<TInvectory>
}

export type TPlace = {
  id: string;
  name: string;
  parts: Array<string>
}

export type TInvectory = {
  name:string
  count: number
  id: string
  placeId: string
}

export type THierarchy = {
  id: string
  name: string
  parts: Array<THierarchy> | undefined
}
