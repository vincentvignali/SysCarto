import { create } from "zustand";
import {
  type Node,
  type Edge,
  getOutgoers,
  getIncomers,
  getConnectedEdges,
  type XYPosition,
  ReactFlowInstance,
} from "reactflow";
import { type Corner } from "../components/ContextMenu/ContextMenu";
import { initialEdges, initialNodes } from "../../public/DataSample";
import { toPanels } from "@/dataManager/splitter";
import { chainReveal } from "@/interactions/selectors";

interface NodeId {
  id: string;
}

export interface NodeData {
  label: string;
}

export interface EdgeData {}

export interface Panel {
  nodes: Node<NodeData>[];
  edges: Edge<EdgeData>[];
}

const deleteNodesFromPanel = (ids: string[], panel: Panel): Panel => ({
  nodes: panel.nodes.filter((node) => !ids.includes(node.id)),
  edges: panel.edges.filter(
    (edge) => !ids.includes(edge.source) && !ids.includes(edge.target)
  ),
});

export type PanelType = "Infra" | "Service" | "Global" | "Physical";

// this enum will help to turn the store individual panels into
// a list of panels
export enum PanelIndex {
  GLOBAL = 0,
  PHYSICAL,
  INFRA,
  SERVICE,
  __NB_PANELS, // number of panels (must be in the end of the enum)
}

export type graph = {
  raw: Panel;
  byPanels: {
    [key in PanelType]: Panel;
  };
};

interface ContextMenu {
  panelClick: PanelIndex;
  rfInstance: ReactFlowInstance<any, any>;
  node: Node<any> | null;
  x: number;
  y: number;
  cursorAt: Corner;
}

export interface State {
  hovered: Node<any> | null;
  selected: Node<any> | null;
  detailed: Node<any> | null;
  disabled: string[];
  chainHovered: string[];
  chainSelected: string[];
  contextMenu: ContextMenu | null;
  crossPanelEdges: Edge<any>[];
  crossPanelEdgesSelected: Edge<any>[];
  crossPanelEdgesHovered: Edge<any>[];
  panels: Panel[];
  // panel1: Panel;
  // panel2: Panel;
  // panel3: Panel;
}

export const useStore = create<State>(() => ({
  disabled: [],
  hovered: null,
  selected: null,
  chainHovered: [],
  chainSelected: [],
  contextMenu: null,
  detailed: null,
  graph: null,
  crossPanelEdges: [],
  crossPanelEdgesSelected: [],
  crossPanelEdgesHovered: [],
  panels: [],
  // panel1: {
  //   nodes: [
  //     { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  //     { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
  //   ],
  //   edges: [{ id: "e1-2", source: "1", target: "2" }],
  // },
  // panel2: {
  //   nodes: [
  //     { id: "a", position: { x: 0, y: 0 }, data: { label: "a" } },
  //     { id: "b", position: { x: 0, y: 100 }, data: { label: "b" } },
  //   ],
  //   edges: [{ id: "e-ab", source: "a", target: "b" }],
  // },
  // panel3: {
  //   nodes: [
  //     { id: "x", position: { x: 0, y: 0 }, data: { label: "x" } },
  //     { id: "y", position: { x: 0, y: 100 }, data: { label: "y" } },
  //   ],
  //   edges: [{ id: "e-xy", source: "x", target: "y" }],
  // },
}));

export const init = async () => {
  // const response = await fetch(dataUrlSource);
  // const jsonGraph = await response.json();
  const edges = initialEdges;
  const nodes = initialNodes;

  const splitter = toPanels(nodes, edges);
  useStore.setState(() => ({
    crossPanelEdges: splitter.CrossPanelEdge,
  }));

  useStore.setState(() => ({
    panels: [
      splitter.Global,
      splitter.Physical,
      splitter.Infra,
      splitter.Service,
    ],
  }));
  // useStore.setState(() => ({
  //   panel1: splitter.Physical,
  // }));
  // useStore.setState(() => ({
  //   panel2: splitter.Infra,
  // }));
  // useStore.setState(() => ({
  //   panel3: splitter.Service,
  // }));
};

export const setCrossPanelEdges = (crossPanelEdges: Edge<any>[]) => {
  useStore.setState(() => ({
    crossPanelEdges: crossPanelEdges,
  }));
};
export const setDetailed = (detailed: Node<any> | null) => {
  useStore.setState(() => ({
    detailed,
  }));
};

export const setPanel = (index: PanelIndex, newPanel: Panel) => {
  useStore.setState((state) => {
    const panels = state.panels;
    panels[index] = newPanel;
    return { ...state, panels: panels };
  });
};

export const setHovered = (nodeHovered: Node<any> | null) => {
  if (nodeHovered) {
    const store = useStore.getState();
    const chainHovered = [
      nodeHovered.id,
      ...chainReveal(store, nodeHovered),
    ].filter(Boolean);

    const crossPanelEdgesHovered = store.crossPanelEdges.filter(
      (edge: Edge<any>) => {
        return (
          chainHovered.includes(edge.source) &&
          chainHovered.includes(edge.target)
        );
      }
    );
    useStore.setState(() => ({
      hovered: nodeHovered,
      chainHovered,
      crossPanelEdgesHovered,
    }));
  } else {
    useStore.setState(() => ({
      hovered: null,
      chainHovered: [],
      crossPanelEdgesHovered: [],
    }));
  }
};

export const setSelected = (nodeSelected: Node<any> | null) => {
  if (nodeSelected) {
    const store = useStore.getState();
    const currentChain = [nodeSelected.id, ...chainReveal(store, nodeSelected)];
    useStore.setState(() => ({
      selected: nodeSelected,
      chainSelected: [nodeSelected.id, ...currentChain].filter(Boolean),
      crossPanelEdgesSelected: store.crossPanelEdges.filter(
        (edge: Edge<any>) => {
          return (
            currentChain.includes(edge.source) &&
            currentChain.includes(edge.target)
          );
        }
      ),
    }));
  } else {
    useStore.setState(() => ({
      selected: null,
      chainSelected: [],
      crossPanelEdgesSelected: [],
    }));
  }
};

export const disableNode = (node: Node<any>) => {
  useStore.setState((state) => ({
    disabled: [...state.disabled, node.id],
  }));
};

export const enableNode = (node: Node<any>) => {
  useStore.setState((state) => ({
    disabled: [...state.disabled.filter((nodeId) => nodeId !== node.id)],
  }));
};

export const setContextMenu = (contextMenu: ContextMenu) => {
  useStore.setState(() => ({
    contextMenu,
  }));
};

export const closeContextMenu = () => {
  useStore.setState(() => ({
    contextMenu: null,
  }));
};
export const nodeFinder = (nodeId: string, store: State): Node<any> | null => {
  const nodes = store.panels[0].nodes;
  const foundNode = nodes.find((node: Node<any>) => {
    return node.id === nodeId;
  });
  return foundNode ? foundNode : null;
};

export const childFinder = (store: State, focusNode: Node) => {
  const panelType = panelTypeFinder(focusNode);
  if (panelType) {
    const nodes = store.panels[PanelIndex.GLOBAL].nodes;
    const retrievedNode = nodes.find((node) => node.id === focusNode.id);
    const childNodes = nodes.filter((node) => {
      return node.parentNode === retrievedNode?.id;
    });
    if (childNodes?.length >= 1) {
      return childNodes;
    } else {
      return null;
    }
  }
};

export const sourceFinder = (store: State, focusNode: Node) => {
  const panelType = panelTypeFinder(focusNode);
  if (panelType) {
    const sourceInnerNodes = getIncomers(
      focusNode,
      store.panels[panelType].nodes,
      store.panels[panelType].edges
    );
    const sourceOutterNodes = getIncomers(
      focusNode,
      store.panels[PanelIndex.GLOBAL].nodes,
      store.crossPanelEdges
    );
    return [...sourceInnerNodes, ...sourceOutterNodes];
  } else {
    return [];
  }
};

export const parentFinder = (store: State, focusNode: Node) => {
  const panelType = panelTypeFinder(focusNode);
  if (panelType) {
    const nodes = store.panels[panelType].nodes;
    const retrievedNode = nodes.find((node) => node.id === focusNode.id);
    const parentNode = nodes?.find(
      (node) => node.id === retrievedNode?.parentNode
    );
    if (parentNode) {
      return parentNode;
    }
  } else {
    return null;
  }
};

export const targetFinder = (store: State, focusNode: Node) => {
  const panelType = panelTypeFinder(focusNode);
  if (panelType) {
    const targetInnerNodes = getOutgoers(
      focusNode,
      store.panels[panelType].nodes,
      store.panels[panelType].edges
    );

    const targetOutterNodes = getOutgoers(
      focusNode,
      store.panels[PanelIndex.GLOBAL].nodes,
      store.crossPanelEdges
    );
    targetOutterNodes;

    return [...targetInnerNodes, ...targetOutterNodes];
  } else {
    return [];
  }
};

export const panelTypeFinder = (node: Node<any>) => {
  switch (node.type) {
    case "rack":
      return PanelIndex.PHYSICAL;
    case "pdu":
      return PanelIndex.PHYSICAL;
    case "power":
      return PanelIndex.PHYSICAL;
    case "machine":
      return PanelIndex.INFRA;
    case "virtual_machine":
      return PanelIndex.INFRA;
    case "service":
      return PanelIndex.INFRA;
    case "meta_service":
      return PanelIndex.SERVICE;
  }
};

// export const deleteNode = (nodeId: string) => {
//   useStore.setState((state) => ({
//     panel1: deleteNodesFromPanel(
//       [nodeId, ...relatedNodeIds(nodeId)],
//       state.panel1
//     ),
//     panel2: deleteNodesFromPanel(
//       [nodeId, ...relatedNodeIds(nodeId)],
//       state.panel2
//     ),
//     panel3: deleteNodesFromPanel(
//       [nodeId, ...relatedNodeIds(nodeId)],
//       state.panel3
//     ),
//   }));
// };

// computeAbsolute return the absolute position within a reactflow instance
// It is relevant in the case of parentNode: the children have then a relative
// position.
export const computeAbsolute = (store: State, node: Node<any>): XYPosition => {
  // copy the position
  let position = { ...node.position };

  if (node.parentNode) {
    const parent = parentFinder(store, node);
    if (parent) {
      const p = computeAbsolute(store, parent);
      position.x += p.x;
      position.y += p.y;
    }
  }

  return position;
};

export interface visitorAction {
  filterNode?: (node: Node<any>) => boolean;
  onNode: (node: Node<any>) => Node<any>;
  onConnectedEdges?: (edge: Edge<any>) => Edge<any>;
}

// visitNodes pass through all nodes and apply an action on them
// Additionnaly we can apply an action on the connected edges
// Finally we can filter the nodes on which the action is performed
export const visitNodes = async (action: visitorAction) => {
  type PT = "panel1" | "panel2" | "panel3";

  // get the state
  const state = useStore.getState();

  const visitPanel = (
    p: PanelIndex,
    { filterNode, onNode, onConnectedEdges }: visitorAction
  ) => {
    const modifiedNodes: Node<any>[] = [];

    // modify the nodes
    const nodes = state.panels[p].nodes.map((node) => {
      if (filterNode === undefined || filterNode(node)) {
        modifiedNodes.push(node);
        return onNode(node);
      }
      return node;
    });

    // modify the edges
    let edges: Edge<any>[];
    if (onConnectedEdges) {
      const connectedEdges = getConnectedEdges(
        modifiedNodes,
        state.panels[p].edges
      );
      const otherEdges = state.panels[p].edges.filter(
        (edge) => !connectedEdges.includes(edge)
      );
      edges = [...otherEdges, ...connectedEdges.map(onConnectedEdges)];
    } else {
      edges = state.panels[p].edges;
    }

    const newPanel = { nodes: nodes, edges: edges };
    return { newPanel, modifiedNodes };
  };

  const s: Partial<State> = {};

  let allModifiedNodes: Node<any>[] = [];
  for (let index = 0; index < PanelIndex.__NB_PANELS; index++) {
    const { newPanel, modifiedNodes } = visitPanel(index, action);
    allModifiedNodes = allModifiedNodes.concat(modifiedNodes);
    if (s.panels) {
      s.panels[index] = newPanel;
    }
  }

  // global panel
  let crossPanelEdges: Edge<any>[];
  if (action.onConnectedEdges) {
    const connectedEdges = getConnectedEdges(
      allModifiedNodes,
      state.crossPanelEdges
    );
    const otherEdges = state.crossPanelEdges.filter(
      (edge) => !connectedEdges.includes(edge)
    );
    crossPanelEdges = [
      ...otherEdges,
      ...connectedEdges.map(action.onConnectedEdges),
    ];
  } else {
    crossPanelEdges = state.crossPanelEdges;
  }
  s.crossPanelEdges = crossPanelEdges;

  // set the state
  useStore.setState(() => s);
};
