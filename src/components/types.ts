import { ComponentType, FC } from "react";

import { Metadata } from "@/dataManager/types";
import { Edge, EdgeProps, Node, NodeProps } from "reactflow";

export interface NodeComponentProps {
  [key: string]: any;
  data: Metadata;
}

export type NodeComponent = ComponentType<NodeProps<any>>;

export type svgCollection = {
  [key: string]: any;
};
