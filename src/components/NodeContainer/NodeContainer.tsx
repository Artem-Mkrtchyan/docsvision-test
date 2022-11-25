import React from 'react'
import { useAppDispatch } from '../../hooks/redux'
import { setCurrentInventory, setCurrentName, setRoom } from '../../store/actions/actionPlace'
import { THierarchy, TInventory } from '../../types/databaseType'
import { extractKeysFromDependencies, putAllSetsOfKeysWithData } from '../../utils/helperFunc'
import { Node } from './Node/Node'
import { NodeRow } from './NodeRow/NodeRow'
import { NodeWrapper } from './NodeWrapper/NodeWrapper'

type TProps = {
  arr: Array<THierarchy>,
  inventory: Array<TInventory>
}

export const NodeContainer: React.FC<TProps> = ({ arr, inventory }) => {

  const dispatch = useAppDispatch()

  const buildTree = (arr: Array<THierarchy>, inventory: Array<TInventory>) => {
    const mappedNode = arr.map((node) => {

      const currInvectory = putAllSetsOfKeysWithData(
        extractKeysFromDependencies(node.id, arr),
        inventory
      )

      const showCurrentInventory = (arr: Array<TInventory>) => {
        dispatch(setCurrentInventory(arr))
        dispatch(setCurrentName(node.name))
        !!node.parts.length ? dispatch(setRoom('')) : dispatch(setRoom(node.id))
      }

      return (
        <Node key={node.id}>
          <>
            <NodeRow currentInventory={currInvectory} onClick={showCurrentInventory} nodeName={node.name} />

            {node.parts ? buildTree(node.parts, inventory) : null}
          </>
        </Node>
      )
    })

    return mappedNode
  }

  return (
    <NodeWrapper>
      {arr.length
        ? buildTree(arr, inventory)
        : <span>No data</span>
      }
    </NodeWrapper>
  )
}
