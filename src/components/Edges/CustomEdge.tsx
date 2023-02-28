import cls from "classnames";
import { EdgeProps, Position, getSimpleBezierPath } from "reactflow";

import { edgeBaseClassStyle, edgeClassesByPresentation } from "./shared";
import { useEdgePresentation } from "@/hooks/useEdgePresentation";
import CustomMarker from "./CustomMarker";

/** Custom edges is used to distinguish edges beetween zoom layer.
 */
export const CustomEdge = (edge: EdgeProps) => {
  /** Destructuring */
  let { id, markerEnd, sourceX, sourceY, targetX, targetY } = edge;

  // const deepZoomLayer = zoom.deepZoomLayer;

  /** Build its path */
  getSimpleBezierPath;
  const [path, labelX, labelY] = getSimpleBezierPath({
    sourceX: sourceX,
    sourceY: sourceY,
    sourcePosition: Position.Bottom,
    targetX: targetX,
    targetY: targetY,
    targetPosition: Position.Top,
  });

  const presentation = useEdgePresentation(edge);
  return (
    <>
      <CustomMarker
        edgeId={edge.id}
        presentation={presentation}
        crossPanelEdge={false}
      />
      <CustomMarker
        edgeId={edge.id}
        presentation={presentation}
        crossPanelEdge={false}
        startOrEnd
      />
      <path
        id={id}
        className={cls(
          edgeBaseClassStyle,
          edgeClassesByPresentation(presentation)
        )}
        d={path}
        // markerStart={`url(#${edge.id}startCustomMarkerRegular)`}
        // markerEnd={`url(#${edge.id}endCustomMarkerRegular)`}
      />
    </>
  );
};
