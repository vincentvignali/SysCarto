import { CustomEdge } from "@/components/Edges/CustomEdge";
import { Machine } from "@/components/Nodes/Machine";
import { MetaService } from "@/components/Nodes/MetaService";
import { NetworkInterface } from "@/components/Nodes/NetworkInterface";
import { Pdu } from "@/components/Nodes/Pdu";
import { Power } from "@/components/Nodes/Power";
import { Rack } from "@/components/Nodes/Rack";
import { Region } from "@/components/Nodes/Region";
import { Service } from "@/components/Nodes/Service";
import { Subnetwork } from "@/components/Nodes/Subnetwork";
import { Vm } from "@/components/Nodes/Vm";
import {
  Edge,
  EdgeTypes,
  Node,
  NodeProps,
  NodeTypes,
  SimpleBezierEdge,
  SmoothStepEdge,
  StepEdge,
  StraightEdge,
} from "reactflow";

// types for back ------------------------------------------------------------

export type NodeType =
  | "service"
  | "network_interface"
  | "subnetwork"
  | "machine"
  | "region";

export const nodeTypes: NodeTypes = {
  meta_service: MetaService,
  service: Service,
  virtual_machine: Vm,
  machine: Machine,
  pdu: Pdu,
  power: Power,
  rack: Rack,
  network_interface: NetworkInterface,
  region: Region,
  subnetwork: Subnetwork,
};
export const edgeTypes: EdgeTypes = {
  default: CustomEdge,
  straight: StraightEdge,
  step: StepEdge,
  smoothstep: SmoothStepEdge,
  simplebezier: SimpleBezierEdge,
};

export type NodeComponentstate =
  | "selected"
  | "related"
  | "inactive"
  | undefined;

export type MachineComponentType = "docker" | "classic" | undefined;

export interface Metadata {
  [key: string]: any;
}

export interface NodeFromBackend {
  id: number;
  position?: {
    x: number;
    y: number;
  };
  type: NodeType;
  data: Metadata;
  parentNode?: string;
  extent?: string;
}

export interface EdgeFromBackend {
  id: string;
  source: number;
  target: number;
  data: Metadata;
}

export interface BackendResponse {
  nodes: NodeFromBackend[];
  edges: EdgeFromBackend[];
}

// types for front -----------------------------------------------------------

export interface Graph<T> {
  nodes: Array<Node<T>>;
  edges: Array<Edge<T>>;
}
