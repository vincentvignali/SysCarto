import { useNodePresentation } from "@/hooks/useNodePresentation";
import cls from "classnames";
import { NodeProps } from "reactflow";
import { NodeComponent } from "@/components/types";
import { TbArrowFork } from "react-icons/tb";
import { nodeBaseClass, nodeCls, presentationClasses } from "./common/style";
import { TitleBar } from "./common/TitleBar";
import {
  HandleBottom,
  HandleTop,
  HandleRight,
  HandleLeft,
} from "./common/CustomHandles";

/** a Component used by reactFlow to render the node */
export const Pdu: NodeComponent = (props: NodeProps<any>) => {
  const presentationState = useNodePresentation(props);

  const background = "bg-[#F6C8BE] ";

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
