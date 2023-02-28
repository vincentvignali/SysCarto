import { FC } from "react";
import { EdgeProps } from "reactflow";
import { EdgePresentation } from "@/hooks/useEdgePresentation";
import { arrowClassesByPresentation } from "@/components/Edges/shared";
import cls from "classnames";

interface CustomMarkerProps {
  presentation: EdgePresentation;
  edgeId: string;
  type?: string;
  orient?: string;
  startOrEnd?: boolean;
  crossPanelEdge?: boolean;
}

const CustomMarker: FC<CustomMarkerProps> = (props) => {
  const zIndex =
    props.presentation === "selected"
      ? "z-10"
      : props.presentation === "hovered"
      ? "z-4"
      : "";
  return (
    <defs>
      <marker
        id={`${props.edgeId}${props.startOrEnd ? "start" : "end"}CustomMarker${
          props.crossPanelEdge ? "CrossPanel" : "Regular"
        }`}
        markerWidth={"12.5"}
        markerHeight={"12.5"}
        viewBox={"-20 -20 35 35"}
        markerUnits="strokeWidth"
        orient={props.crossPanelEdge ? "180" : "90"}
        refX="0"
        refY="0"
        className={
          props.presentation === "selected" || " hovered" ? "z-10" : "z-0"
        }
      >
        {" "}
        {props.startOrEnd ? (
          <circle
            transform="translate(-5 -5)"
            cx="5"
            cy="5"
            r="5"
            className={cls(
              zIndex,
              arrowClassesByPresentation(props.presentation)
            )}
          />
        ) : (
          <polyline
            transform="translate(5 0)"
            strokeLinejoin="round"
            strokeLinecap="round"
            className={cls(
              zIndex,
              arrowClassesByPresentation(props.presentation)
            )}
            points="-11, -10 0,0 -11,10 -11,-10"
          ></polyline>
        )}
      </marker>
    </defs>
  );
};

export default CustomMarker;
