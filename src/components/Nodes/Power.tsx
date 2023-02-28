import { useNodePresentation } from "@/hooks/useNodePresentation";
import cls from "classnames";
import { NodeProps } from "reactflow";
import { NodeComponent } from "@/components/types";
import { MdPower } from "react-icons/md";
import { nodeBaseClass, nodeCls, presentationClasses } from "./common/style";
import { TitleBar } from "./common/TitleBar";
import {
  HandleBottom,
  HandleTop,
  HandleRight,
  HandleLeft,
} from "./common/CustomHandles";

/** a Component used by reactFlow to render the node */
export const Power: NodeComponent = (props: NodeProps<any>) => {
  const presentationState = useNodePresentation(props);

  const background = "bg-[#BDD9D7] ";

  const classByPresentation: presentationClasses = {
    onRelated: "border-kale-500",
    onSelected: "border-kale-700",
  };
  return (
    <div
      className={nodeCls(presentationState, classByPresentation, background)}
    >
      <TitleBar icon={MdPower} title={props.data.label} />
      <HandleTop id={`${props.id}HandleTop`} className="!bg-kale-300" />
      <HandleRight id={`${props.id}HandleRight`} className="!bg-kale-300" />
      <HandleBottom id={`${props.id}HandleBottom`} className="!bg-kale-300" />
      <HandleLeft id={`${props.id}HandleLeft`} className="!bg-kale-300" />
    </div>
  );
};
