import {
  edgeBaseClassStyle,
  edgeClassesByPresentation,
} from "@/components/Edges/shared";
import cls from "classnames";
import { FC, MutableRefObject, useEffect, useRef, useState } from "react";
import { useMeasure } from "react-use";
import {
  Edge,
  EdgeMarker,
  EdgeProps,
  getBezierPath,
  getMarkerEnd,
  getSmoothStepPath,
  MarkerType,
  Position,
} from "reactflow";
import CustomMarker from "./CustomMarker";
import { BestRawPath } from "./path";
import { useEdgePresentation } from "../../hooks/useEdgePresentation";

export const CrossEdgePanel: FC<{
  edge: EdgeProps<any> | Edge<any>;
  source: string;
  target: string;
  observeRef: MutableRefObject<HTMLDivElement | null>;
}> = (props) => {
  const [ref, { width, height, top, left }] = useMeasure<HTMLDivElement>();

  const [d, setD] = useState<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  } | null>(null);

  // Initially hardcoded because of a useMeasure bug, then read into the ref on every calculation (in order to avoid re-renders).
  const headerHeight = useRef<number>(54);

  const calculate = (sourceId?: string, targetId?: string) => {
    const containerTop = props.observeRef.current?.getBoundingClientRect()?.top;
    if (containerTop) {
      headerHeight.current = containerTop;
    }
    if (!sourceId || !targetId) {
      setD(null);
      // for floating edges
      // setRects(null);
      return;
    }

    // Retrieve handles of target and source nodes
    const node1 = document.body.querySelector(
      `[data-nodeid=${sourceId}][data-handlepos="left"]`
    );
    const node2 = document.body.querySelector(
      `[data-nodeid=${targetId}][data-handlepos="right"]`
    );

    if (!node1 || !node2) {
      setD(null);
      // for floating edges
      // setRects(null);
      return;
    }
    const bb1 = node1.getBoundingClientRect();
    const bb2 = node2.getBoundingClientRect();
    // for floating edges
    // setRects({ from: bb1, to: bb2 });

    setD({
      x1: bb1.left - left + bb1.width / 2,
      y1: bb1.top - (top + headerHeight.current),
      x2: bb2.left - left + bb2.width / 2,
      y2: bb2.top - (top + headerHeight.current),
    });
  };

  useEffect(() => {
    calculate(props.source, props.target);
    if (props.observeRef.current) {
      const obs = new MutationObserver(() => {
        calculate(props.source, props.target);
      });
      obs.observe(props.observeRef.current, {
        attributes: true,
        subtree: true,
        childList: true,
      });
      return () => {
        obs.disconnect();
      };
    }
  }, [props.source, , props.target]);

  const offset1 = 0;
  const offset2 = 0;

  const presentation = useEdgePresentation(props.edge);

  if (d) {
    const [path, labelX, labelY] = getBezierPath({
      // getSmoothStepPath({
      sourceX: d?.x1,
      sourceY: d?.y1,
      sourcePosition: Position.Left,
      targetPosition: Position.Right,
      targetX: d.x2,
      targetY: d.y2,
      curvature: 500,
      // offset: 0,
    });

    return (
      <div ref={ref} className="absolute inset-0 z-40 pointer-events-none">
        {d && (
          <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            <CustomMarker
              edgeId={props.edge.id}
              presentation={presentation}
              crossPanelEdge
            />
            <CustomMarker
              edgeId={props.edge.id}
              presentation={presentation}
              crossPanelEdge
              startOrEnd
            />
            <path
              className={cls(
                edgeBaseClassStyle,
                edgeClassesByPresentation(presentation)
              )}
              // d={`M${d.x1},${d.y1 - offset1} L${d.x1},${Math.min(
              //   d.y1 - offset2,
              //   d.y2 - offset2
              // )} L${d.x2},${Math.min(d.y1 - offset2, d.y2 - offset2)} L${
              //   d.x2
              // },${d.y2 - offset1}`}
              d={path}
              fill="none"
              strokeWidth={20}
              // markerEnd={(markerEnd)} TODO: Add a marker arrow at the end.
              // markerStart={`url(#${props.edge.id}startCustomMarkerCrossPanel)`}
              // markerEnd={`url(#${props.edge.id}endCustomMarkerCrossPanel)`}
            ></path>

            {/* <path
              d={`M${d.x2},${d.y2 - offset1} l-5,-10 l10,0 z`}
              className={cls(
                arrowBaseClassStyle,
                arrowClassesByPresentation(presentation)
              )}
            ></path> */}
          </svg>
        )}
      </div>
    );
  } else return null;
};
