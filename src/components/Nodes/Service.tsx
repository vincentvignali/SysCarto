import { NodeComponent } from "@/components/types";
import { useNodePresentation } from "@/hooks/useNodePresentation";
import cls from "classnames";
import { HiOutlineCube } from "react-icons/hi2";
import { NodeProps } from "reactflow";
import { nodeBaseClass, nodeCls, presentationClasses } from "./common/style";
import { TitleBar } from "./common/TitleBar";
import {
  HandleBottom,
  HandleTop,
  HandleRight,
  HandleLeft,
} from "./common/CustomHandles";

/** A Component used by reactFlow to render the node. Is Set on hidden false thanks to a setNode within zoom component */
export const Service: NodeComponent = (props: NodeProps<any>) => {
  const presentationState = useNodePresentation(props);

  const background = "bg-pink-400 !text-white";

  const classByPresentation: presentationClasses = {
    onRelated: "border-pink-400",
    onSelected: "border-pink-600",
  };
  return (
    <div
      className={nodeCls(presentationState, classByPresentation, background)}
    >
      <TitleBar icon={HiOutlineCube} title={props.data.label} />
      <HandleTop id={`${props.id}HandleTop`} className="!bg-pink-400" />
      <HandleRight id={`${props.id}HandleRight`} className="!bg-pink-400" />
      <HandleBottom id={`${props.id}HandleBottom`} className="!bg-pink-400" />
      <HandleLeft id={`${props.id}HandleLeft`} className="!bg-pink-400" />
    </div>
  );
};
