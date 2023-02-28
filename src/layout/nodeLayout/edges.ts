import { Edge, Node, Position, NodeProps, MarkerType } from "reactflow";

/**
When a machine has multiple network interfaces, some might be located up in the top section and others down in the bottom section.
This functions Makes the edges connecting the the right handle based on the position of the network interfaces they target.
*/
export const runEdgesPositionning = (
  edges: Edge<any>[],
  nodes: Node<any>[]
): Array<Edge> => {
  // Check if there is more than one interface, otherwise, there is no need to change the edges.
  const machineNode = nodes.filter((node) => node.type === "machine");

  machineNode.map((parentNode) => {
    const childNodes = nodes.filter(
      (node) => node.parentNode === parentNode.id
    );
    const numberOfInterfaces = childNodes.filter(
      (childNode) => childNode.type === "network_interface"
    ).length;
    if (numberOfInterfaces === 1) {
      edges
        .filter((edge) => childNodes.some((node) => node.id === edge.source))
        .map((edge) => {
          edge.targetHandle = Position.Top;
          edge.sourceHandle = Position.Bottom;
        });
    }
    if (numberOfInterfaces > 1) {
      // Retrieve all Nodes from the upper row.
      const upperInterfaces = childNodes.filter((node, index) => {
        return (
          node.type === "network_interface" && (index === 0 || index % 2 === 0)
        );
      });
      // Retrieve all Nodes from the lower row.
      const lowerInterfaces = childNodes.filter((node, index) => {
        return node.type === "network_interface" && index % 2 !== 0;
      });

      // Retrieve all edges connected to the nodes retrieved previously
      const upperEdges = edges.filter((edge) =>
        upperInterfaces.some((node) => node.id === edge.source)
      );
      upperEdges.map((edge) => (edge.targetHandle = Position.Top));
      upperEdges.map((edge) => (edge.sourceHandle = Position.Bottom));
      // Retrieve all edges connected to the nodes retrieved previously
      const lowerEdges = edges.filter((edge) =>
        lowerInterfaces.some((node) => node.id === edge.source)
      );
      // Change the targetHandle of the lowerInterfaceEdges
      lowerEdges.map((edge) => (edge.targetHandle = Position.Bottom));
      lowerEdges.map((edge) => (edge.sourceHandle = Position.Top));

      const cleanDataSet = [...lowerEdges, ...upperEdges];
      cleanDataSet.map((edge) => {
        edge.hidden = false;
        return edge;
      });
      return cleanDataSet;
    }
  });
  return edges;
};

/**
This functions attaches the markerType, regulated the animated boolean and any required props not reachable by the edge components themselves.
It Applies this props based on Edge props.  
*/
export const runEdgePropsAtribution = (edges: Edge<any>[]): void => {
  const markerTypeFloating = {
    type: MarkerType.ArrowClosed,
    color: "#000000",
    width: 40,
    height: 40,
    orient: "auto",
    strokeWidth: 2,
  };
  const markerTypeCustom = {
    type: MarkerType.ArrowClosed,
    color: "#923981",
    width: 40,
    height: 40,
    orient: "auto",
    strokeWidth: 2,
  };

  edges.map((edge) => {
    switch (edge.type) {
      case "floating":
        edge.markerEnd = markerTypeFloating;
        return edge;
      case "custom":
        edge.markerEnd = markerTypeCustom;
        return edge;
      default:
        return edge;
    }
  });
};
