import { THierarchy, TPlace } from "../types/databaseType"

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

