import { useNodePresentation } from "@/hooks/useNodePresentation";
import { NodeProps } from "reactflow";
import { MdStorage } from "react-icons/md";
import cls from "classnames";
import { NodeComponent } from "@/components/types";
import { nodeBaseClass, nodeCls, presentationClasses } from "./common/style";
import { TitleBar } from "./common/TitleBar";
import {
  HandleBottom,
  HandleTop,
  HandleRight,
  HandleLeft,
} from "./common/CustomHandles";

/** a Component used by reactFlow to render the node */
export const Rack: NodeComponent = (props: NodeProps<any>) => {
  const presentationState = useNodePresentation(props);

  const background = "bg-yellow-200";

  const classByPresentation: presentationClasses = {
    onRelated: "border-yellow-300",
    onSelected: "border-yellow-600",
  };
  return (
    <div
      className={nodeCls(presentationState, classByPresentation, background)}
    >
      <TitleBar icon={MdStorage} title={props.data.label} />
      <HandleTop id={`${props.id}HandleTop`} className="!bg-yellow-300" />
      <HandleRight id={`${props.id}HandleRight`} className="!bg-yellow-300" />
      <HandleBottom id={`${props.id}HandleBottom`} className="!bg-yellow-300" />
      <HandleLeft id={`${props.id}HandleLeft`} className="!bg-yellow-300" />
    </div>
  );
};
