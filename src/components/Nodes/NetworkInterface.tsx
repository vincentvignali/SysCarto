import { useNodePresentation } from "@/hooks/useNodePresentation";
import { NodeProps } from "reactflow";
import { NodeComponent } from "@/components/types";
import cls from "classnames";
import { nodeBaseClass, nodeCls, presentationClasses } from "./common/style";
import { TitleBar } from "./common/TitleBar";
import {
  HandleBottom,
  HandleTop,
  HandleRight,
  HandleLeft,
} from "./common/CustomHandles";
import { TbArrowFork } from "react-icons/tb";

/** A Component used by reactFlow to render the node. Is set to hidden : false with a setNodes triggers on zoom*/
export const NetworkInterface: NodeComponent = (props: NodeProps<any>) => {
  const presentationState = useNodePresentation(props);

  const background = "bg-green-200";

  const classByPresentation: presentationClasses = {
    onRelated: "border-kale-500",
    onSelected: "border-kale-700",
  };

  return (
    <div
      className={nodeCls(presentationState, classByPresentation, background)}
    >
      <TitleBar icon={TbArrowFork} title={props.data.label} />
      <HandleTop id={`${props.id}HandleTop`} className="!bg-teal-300" />
      <HandleRight id={`${props.id}HandleRight`} className="!bg-teal-300" />
      <HandleBottom id={`${props.id}HandleBottom`} className="!bg-teal-300" />
      <HandleLeft id={`${props.id}HandleLeft`} className="!bg-teal-300" />
    </div>
  );
};
