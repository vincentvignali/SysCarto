import { NodeComponent } from "@/components/types";
import { useNodePresentation } from "@/hooks/useNodePresentation";
import { NodeProps } from "reactflow";
import { nodeCls, presentationClasses } from "./common/style";
import { TitleBar } from "./common/TitleBar";
import {
  HandleBottom,
  HandleTop,
  HandleRight,
  HandleLeft,
} from "./common/CustomHandles";
import { HiOutlineCube } from "react-icons/hi2";

/** A Component used by reactFlow to render the node */
export const Subnetwork: NodeComponent = (props: NodeProps<any>) => {
  const presentationState = useNodePresentation(props);

  const background = "bg-blue-300";

  const classByPresentation: presentationClasses = {
    onRelated: "border-blue-300",
    onSelected: "border-blue-600",
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
