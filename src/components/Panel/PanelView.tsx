import "reactflow/dist/style.css";
import { type FC, useEffect, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  type ProOptions,
  useNodesState,
  useEdgesState,
  Edge,
  useReactFlow,
} from "reactflow";
import {
  setHovered,
  closeContextMenu,
  type Panel,
  setSelected,
  setContextMenu,
  setDetailed,
  PanelIndex,
} from "../../dataManager/store";
import { useDebounce } from "react-use";
import { edgeTypes, nodeTypes } from "@/dataManager/types";
import { useStore } from "../../dataManager/store";
import { ContextMenu } from "../ContextMenu/ContextMenu";

export interface PanelViewProps {
  panelIndex: PanelIndex;
  onChange: (panelIndex: PanelIndex, panel: Panel) => void;
  panel: Panel;
}

export const PanelView: FC<PanelViewProps> = ({
  panelIndex,
  onChange,
  panel,
}) => {
  const hovered = useStore(useCallback((state) => state.hovered, []));
  const [nodes, setNodes, onNodesChange] = useNodesState(panel.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(panel.edges);

  const updatedInternally = useRef<boolean>(false);

  /**
   * Broadcast changes to the store at a debounced rate.
   * A flag is set in the `updatedInternally` ref to prevent reinitializing the nodes.
   * When updates to the graph happen for an external reason, the graph is rebuild internally
   * (see the following `useEffect` hook)
   */
  useDebounce(
    () => {
      updatedInternally.current = true;
      onChange(panelIndex, {
        nodes,
        edges,
      });
    },
    200,
    [nodes, edges]
  );

  useEffect(() => {
    if (updatedInternally.current) {
      // Change was initiated internally, the react-flow state is in sync with the outside state.
      // At this point, simply remove the flag.
      updatedInternally.current = false;
    } else {
      // Re-initialize nodes and edges.
      setNodes(panel.nodes);
      // Set the target Handle for regular edges
      setEdges(
        panel.edges.map((edge: Edge<any>) => {
          return { ...edge, targetHandle: `${edge.target}HandleTop` };
        })
      );
    }
  }, [panel]);

  const rfInstance = useReactFlow();
  return (
    <>
      <ReactFlow
        onClick={() => console.log("index", panelIndex)}
        onContextMenu={(ev: any) => {
          const bb = document
            .getElementsByTagName("header")[0]
            .getBoundingClientRect();
          ev.preventDefault();
          setContextMenu({
            panelClick: panelIndex,
            rfInstance: rfInstance,
            node: hovered,
            x: ev.clientX + 10,
            y: ev.clientY - bb.bottom + 10,
            cursorAt: "tl",
          });
        }}
        proOptions={{ hideAttribution: true } as ProOptions}
        nodes={nodes}
        edges={edges}
        fitView
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeMouseEnter={(_ev, node) => {
          setHovered(node);
        }}
        onNodeMouseLeave={(_ev) => {
          setHovered(null);
        }}
        onPaneClick={() => {
          setSelected(null);
          setDetailed(null);
          closeContextMenu();
        }}
        onNodeClick={(ev: any, node: any) => {
          setDetailed(null);
          setSelected(node);
          closeContextMenu();
        }}
      />
    </>
  );
};
