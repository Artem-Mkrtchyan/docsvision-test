import { THierarchy, TInventory, TPlace } from "../types/databaseType"

export const randomIndex = (): string => Math.random().toString(36).substring(2, 15)



export const createHierarchyTree = (hierarchy: Array<TPlace>, places: Array<TPlace>): Array<THierarchy> => {
  return hierarchy.map((node: TPlace) => extractParts(node, places))
}

const extractParts = (node: TPlace, places: Array<TPlace>): THierarchy => {

  const objNode = node.parts.map((part: string) => {
    const nodeChild = parseNodes(places, part)
      return extractParts(nodeChild!, places)
  })

  return { name: node.name, id: node.id, parts: objNode }
}

export const parseNodes = (places: Array<TPlace>, part: string): TPlace | undefined => {
  return places.find((place: TPlace) => place.id === part)
}

export const putAllSetsOfKeysWithData = (keys: Array<Array<string>>, inventory: Array<TInventory>) => {
  let currentInventory: Array<TInventory> = []
  inventory.forEach((inventory: TInventory) => {
    keys[0].forEach((key: string) => {
      if (key === inventory.placeId) {
        currentInventory.push(inventory)
      }
    })
  })
  return currentInventory
}

export const extractKeysFromDependencies = (id: string, hierarchy: Array<THierarchy>) => {
  let keysForInventory: Array<Array<string>> = []

  hierarchy.forEach((node: THierarchy) => {
    extractKeysFromDependenciesRecursion(id, node, keysForInventory)
  })

  return  keysForInventory
}

export const extractKeysFromDependenciesRecursion = (id: string, node: THierarchy, keysForInventory: Array<Array<string>>) => {

  if (node.id === id) {
    const parts = node.parts.map((node: THierarchy) => {
      const nodes = node.parts.map((room: THierarchy) => room.id)
      return nodes
    })

    keysForInventory.push(
      [
        parts.flat(),
        ...(node.parts.map((item: THierarchy) => item.id)),
        node.id,
      ].flat()
    )
  } else {
    node.parts.forEach((node: THierarchy) => {
      extractKeysFromDependenciesRecursion(id, node, keysForInventory)
    })
  }
}

