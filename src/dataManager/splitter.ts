import { Edge, MarkerType, Node, NodeProps } from "reactflow";

type panel = {
  nodes: Node[];
  edges: Edge[];
};

export const toPanels = (nodes: Node[], edges: Edge[]) => {
  const Global = {
    nodes: nodes,
    edges: edges,
  };

  const physicalPanel = {
    nodes: Array(),
    edges: Array(),
  };

  const infraPanel = {
    nodes: Array(),
    edges: Array(),
  };
  const servicePanel = {
    nodes: Array(),
    edges: Array(),
  };

  nodes.map((node: Node) => {
    node.data.state = "inactive";
    if (node.type === "meta_service") {
      servicePanel.nodes.push(node);
    } else if (
      node.type === "power" ||
      node.type === "pdu" ||
      node.type === "rack"
    ) {
      physicalPanel.nodes.push(node);
    } else {
      infraPanel.nodes.push(node);
    }
  });

  const physicalPanelNodesId = physicalPanel.nodes.map((node: any) => {
    return node.id;
  });
  const infraPanelNodesId = infraPanel.nodes.map((node: any) => {
    return node.id;
  });
  const servicePanelNodesId = servicePanel.nodes.map((node: any) => {
    return node.id;
  });

  const crossPanelEdges: Edge<any>[] = [];

  edges.map((edge: Edge) => {
    if (
      infraPanelNodesId.includes(edge.source) &&
      infraPanelNodesId.includes(edge.target)
    ) {
      infraPanel.edges.push(edge);
    } else if (
      physicalPanelNodesId.includes(edge.source) &&
      physicalPanelNodesId.includes(edge.target)
    ) {
      physicalPanel.edges.push(edge);
    } else if (
      servicePanelNodesId.includes(edge.source) &&
      servicePanelNodesId.includes(edge.target)
    ) {
      servicePanel.edges.push(edge);
    } else {
      crossPanelEdges.push(edge);
    }
  });
  const CrossPanelEdge = crossPanelEdges;
  const Physical = physicalPanel;
  const Infra = infraPanel;
  const Service = servicePanel;

  return { Global, CrossPanelEdge, Physical, Infra, Service };
};
