import { type MutableRefObject, type FC } from "react";
import { Edge } from "reactflow";
import { CrossEdgePanel } from "./Edges/CrossPanelEdge";
import { State } from "../dataManager/store";

export const Overlay: FC<{
  store: State;
  observeRef: MutableRefObject<HTMLDivElement | null>;
}> = ({ store, observeRef }) => {
  console.log("Reload overlay");
  const edgesToBuildSelected = [...store.crossPanelEdgesSelected];
  const edgesToBuildHover = [...store.crossPanelEdges]
    .filter((edge: Edge<any>) => {
      return (
        store.chainHovered.includes(edge.target) &&
        store.chainHovered.includes(edge.source)
      );
    })
    .filter(Boolean);
  if (edgesToBuildSelected.length >= 1 && edgesToBuildHover.length >= 1) {
    return (
      <div className="absolute inset-0">
        {/* Map over selected Edges First */}
        {edgesToBuildSelected.map((edge: Edge<any>) => {
          if (edge) {
            return (
              <CrossEdgePanel
                edge={edge}
                key={`key - ${edge.source} - ${edge.target}`}
                source={edge.source}
                target={edge.target}
                observeRef={observeRef}
              />
            );
          } else {
            return null;
          }
        })}
        {/* Map over Hovered Edges First */}
        {edgesToBuildHover.map((edge: Edge<any>) => {
          if (edge) {
            return (
              <CrossEdgePanel
                edge={edge}
                key={`key - ${edge.source} - ${edge.target}`}
                source={edge.source}
                target={edge.target}
                observeRef={observeRef}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
    );
  } else if (
    edgesToBuildSelected.length >= 1 &&
    edgesToBuildHover.length === 0
  ) {
    return (
      <div className="absolute inset-0">
        {edgesToBuildSelected.map((edge: Edge<any>) => {
          if (edge) {
            return (
              <CrossEdgePanel
                edge={edge}
                key={`key - ${edge.source} - ${edge.target}`}
                source={edge.source}
                target={edge.target}
                observeRef={observeRef}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
    );
  } else if (
    edgesToBuildHover.length >= 1 &&
    edgesToBuildSelected.length === 0
  ) {
    return (
      <div className="absolute inset-0">
        {edgesToBuildHover.map((edge: Edge<any>) => {
          if (edge) {
            return (
              <CrossEdgePanel
                edge={edge}
                key={`key - ${edge.source} - ${edge.target}`}
                source={edge.source}
                target={edge.target}
                observeRef={observeRef}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
    );
  } else {
    return null;
  }
};
