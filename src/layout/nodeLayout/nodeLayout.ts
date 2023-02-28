import { Edge, MarkerType, ReactFlowInstance } from "reactflow";

import {
  runEdgePropsAtribution,
  runEdgesPositionning,
} from "@/layout/nodeLayout/edges";
import { runMachineLayout } from "@/layout/nodeLayout/nodes";
import { nodeSizes } from "@/config";

/**
- Layout organizing nics and services inside the machines. 
- Set the machines and the subnetworks only as draggable.
- Apply the correct handle focus for the edges inside the machines. (nic -> service)
 */
export const machineFocusLayout = (reactFlowInstance: ReactFlowInstance) => {
  reactFlowInstance.setNodes((nodes) => {
    return nodes.map((node) => {
      // 1. Set machines. Set nic & services through the machine
      if (node.type === "machine") {
        runMachineLayout(node, nodes);
        node.draggable = true;
        return node;
        // 2. Set subnetwork
      } else if (node.type === "subnetwork") {
        node.style = {
          ...node.style,
          width: nodeSizes.subnetwork.width,
          height: nodeSizes.subnetwork.height,
        };
        node.draggable = true;
        return node;
      } else {
        return node;
      }
    });
  });

  reactFlowInstance.setEdges((edges: Array<Edge<any>>): Array<Edge<any>> => {
    // Fix the handle targeting of edges based on their target
    const nodes = reactFlowInstance.getNodes();
    runEdgesPositionning(edges, nodes);
    return edges;
  });
};
