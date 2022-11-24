import React, { useEffect } from 'react'
import { Indicator } from '../../components/Indicator/Indicator';
import { Node } from '../../components/NodeContainer/Node/Node';
import { NodeRow } from '../../components/NodeContainer/NodeRow/NodeRow';
import { NodeWrapper } from '../../components/NodeContainer/NodeWrapper/NodeWrapper';
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchInvectory, fetchPlaces } from '../../store/actions/actionPlace';
import { selectors } from '../../store/selectors';
import { THierarchy } from '../../types/databaseType';
import { extractKeysFromDependencies, putAllSetsOfKeysWithData } from '../../utils/helperFunc';


export const MainPage: React.FC = () => {

  const dispatch = useAppDispatch();
  const hierarchy = useAppSelector(selectors.getHierarchy)
  const inventory = useAppSelector(selectors.getInventory)


  useEffect(() => {
    dispatch(fetchPlaces())
    dispatch(fetchInvectory())
  }, [])

  const buildTree = (arr: Array<THierarchy>) => {
    const mappedNode = arr.map((node) => {

      const currInv = putAllSetsOfKeysWithData(
        extractKeysFromDependencies(node.id, hierarchy),
        inventory
      )
      console.log(currInv);
      return (
        <Node>
          <>
            <NodeRow>
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

            {node.parts ? buildTree(node.parts) : null}
          </>
        </Node>
      )
    })

    return mappedNode
  }

  return (
    <section>
      {!hierarchy && !inventory ?
        <p>No found</p>
        :
        <NodeWrapper>
          {hierarchy.length
            ? buildTree(hierarchy)
            : <span>No data</span>
          }
        </NodeWrapper>
      }
    </section>
  )
}
