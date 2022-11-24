import React from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { setCurrentInventory } from '../../store/actions/actionPlace';
import { THierarchy, TInventory } from '../../types/databaseType';
import { extractKeysFromDependencies, putAllSetsOfKeysWithData } from '../../utils/helperFunc';
import { Indicator } from '../Indicator/Indicator';
import { Node } from './Node/Node';
import { NodeRow } from './NodeRow/NodeRow';
import { NodeWrapper } from './NodeWrapper/NodeWrapper';

type TProps = {
  arr: Array<THierarchy>,
  inventory: Array<TInventory>
}

export const NodeContainer: React.FC<TProps> = ({ arr, inventory }) => {

  const dispatch = useAppDispatch();

  const buildTree = (arr: Array<THierarchy>, inventory: Array<TInventory>) => {
    const mappedNode = arr.map((node) => {

      const currInv = putAllSetsOfKeysWithData(
        extractKeysFromDependencies(node.id, arr),
        inventory
      )

      const showCurrentInventory = (arr: Array<TInventory>) => {
        dispatch(setCurrentInventory(arr))
      }

      return (
        <Node key={node.id}>
          <>
            <NodeRow currentInventory={currInv.currentInventory} onClick={showCurrentInventory} >
              <span>
                arrow
              </span>
              <span>
                {node.name}
              </span>
              <span>
                <Indicator indicator={currInv.currentInventory} />
              </span>
            </NodeRow>

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
