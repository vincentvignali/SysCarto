import { useCallback, useMemo } from "react";
import { State, useStore } from "../dataManager/store";
import { Edge, Node, NodeProps } from "reactflow";

export type EdgePresentation = "selected" | "hovered" | "normal";

export const useEdgePresentation = (edge: Edge<any>): EdgePresentation => {
  const store = useStore(useCallback((state) => state, []));

  const isSelected =
    // Check both crossPanelEdges and regular Edges
    store.crossPanelEdgesSelected.includes(edge) ||
    (store.chainSelected.includes(edge.target) &&
      store.chainSelected.includes(edge.source));
  const isHovered =
    // Check both crossPanelEdges and regular Edges
    store.crossPanelEdgesHovered.includes(edge) ||
    (store.chainHovered.includes(edge.target) &&
      store.chainHovered.includes(edge.source));

  // const contextMenu = useStore(useCallback((state) => state.contextMenu, []));

  if (isSelected) {
    return "selected";
  } else if (isHovered) {
    return "hovered";
  } else {
    return "normal";
  }
};
