import { Edge, Node, NodeProps } from "reactflow";

/**
 * Transform all nodes and edges from backend into nodes with the correct format for ReactFlow.
 * @param backendData
 * @returns a graph {nodes, edges}
 */
export const toFlowElements = (backendData: any): any => {
  const newNodes: Array<Node<any>> = backendData.nodes.map((node: any) => {
    let metadata = node.data;
    metadata["id"] = node.id;
    metadata["type"] = node.type;

    if (node.parentNode) {
      const newNode = {
        id: String(node.id),
        type: node.type,
        data: metadata,
        parentNode: node.parentNode,
        extent: "parent",
        position: { x: 0, y: 0 },
      };
      return newNode;
    } else {
      const newNode = {
        id: String(node.id),
        type: node.type,
        data: metadata,
        position: { x: 0, y: 0 },
      };
      return newNode;
    }
  });

  const newEdges: Array<Edge<any>> = backendData.edges
    .map((edge: any) => {
      return [
        {
          id: String(edge.id),
          source: String(edge.source),
          target: String(edge.target),

          data: edge.data,
        },
      ];
    })
    .flat();
  return { nodes: newNodes, edges: newEdges };
};
