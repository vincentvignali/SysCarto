import { useNodePresentation } from "@/hooks/useNodePresentation";
import { NodeProps } from "reactflow";
import cls from "classnames";
import { FaDocker } from "react-icons/fa";
import { HiCpuChip } from "react-icons/hi2";
import { HiServer } from "react-icons/hi";
import { NodeComponent } from "@/components/types";
import { nodeCls, presentationClasses } from "./common/style";
import {
  HandleBottom,
  HandleTop,
  HandleRight,
  HandleLeft,
} from "./common/CustomHandles";
import { nodeIcones } from "./common/nodeIcones";

interface customPresentation {
  [key: string]: boolean;
}

/** a Component used by reactFlow to render the node */
export const Machine: NodeComponent = (props: NodeProps<any>) => {
  //Server Machine formatting (High-level Machine)
  let Icon = nodeIcones.machine;

  //Docker Formatting (SubType Machine)
  if (props.data.machine_type === "docker") {
    Icon = nodeIcones.docker;
  }

  //Virtual Machine Formatting (SubType Machine)
  if (props.data.machine_type === "virtual_machine") {
    Icon = nodeIcones.virtual_machine;
  }

  const machineTypes = ["virtual_machine", "docker", "newMachine"];

  const customClasses: customPresentation = {
    "bg-grey-200": machineTypes.includes(props.data.machine_type),
    "bg-grey-100": !machineTypes.includes(props.data.machine_type),
    "bg-grey-800": props.data.machine_type === "newMachine",
  };
  const classByPresentation: presentationClasses = {
    onRelated: "border-grey-400",
    onSelected: "border-grey-600",
  };

  const presentationState = useNodePresentation(props);

  return (
    <div
      className={nodeCls(presentationState, classByPresentation, customClasses)}
    >
      <span className="absolute inline-block w-4 h-4 text-gray-300 pointer-events-none bottom-1 right-1">
        <Icon size="100%" />
      </span>
      <HandleTop id={`${props.id}HandleTop`} className="!bg-gray-300" />
      <HandleRight id={`${props.id}HandleRight`} className="!bg-gray-300" />
      <HandleBottom id={`${props.id}HandleBottom`} className="!bg-gray-300" />
      <HandleLeft id={`${props.id}HandleLeft`} className="!bg-gray-300" />
    </div>
  );
};
