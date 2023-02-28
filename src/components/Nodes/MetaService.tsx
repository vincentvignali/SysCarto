import { useNodePresentation } from "@/hooks/useNodePresentation";
import { NodeProps } from "reactflow";
import { BsGearFill } from "react-icons/bs";
import { nodeCls, presentationClasses } from "./common/style";
import { TitleBar } from "./common/TitleBar";
import {
  HandleBottom,
  HandleTop,
  HandleRight,
  HandleLeft,
} from "./common/CustomHandles";
import { NodeComponent } from "@/components/types";

/** a Component used by reactFlow to render the node */
export const MetaService: NodeComponent = (props: NodeProps<any>) => {
  const presentationState = useNodePresentation(props);

  const background = "bg-green-200";

  const classByPresentation: presentationClasses = {
    onRelated: "border-green-300",
    onSelected: "border-green-600",
  };

  return (
    <div
      className={nodeCls(
        presentationState,
        classByPresentation,
        background
      ).replace("rounded", "rounded-full")}
    >
      <TitleBar icon={BsGearFill} title={props.data.label} />
      <HandleTop id={`${props.id}HandleTop`} className="!bg-green-300" />
      <HandleRight id={`${props.id}HandleRight`} className="!bg-green-300" />
      <HandleLeft id={`${props.id}HandleLeft`} className="!bg-green-300" />
      <HandleBottom id={`${props.id}HandleBottom`} className="!bg-green-300" />
    </div>
  );
};
