import { useStore } from "@/dataManager/store";
import { useCallback } from "react";
import { NodeProps } from "reactflow";

export type NodePresentation = "selected" | "related" | "inactive" | "disabled";

export const useNodePresentation = (node: NodeProps<any>): NodePresentation => {
  const store = useStore(useCallback((state) => state, []));
  const hovered = useStore(useCallback((state) => state.hovered, []));
  const selected = useStore(useCallback((state) => state.selected, []));

  // const contextMenu = useStore(useCallback((state) => state.contextMenu, []));
  if (selected?.id === node.id || store.chainSelected.includes(node.id)) {
    return "selected";
  } else if (hovered?.id === node.id || store.chainHovered.includes(node.id)) {
    return "related";
  } else if (store.disabled.includes(node.id)) {
    // hover and selected are set in priority
    return "disabled";
  } else {
    return "inactive";
  }
};
