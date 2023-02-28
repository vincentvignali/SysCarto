import { useNodePresentation } from "@/hooks/useNodePresentation";
import cls from "classnames";
import { NodeProps } from "reactflow";
import { FaDocker } from "react-icons/fa";
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
export const Vm: NodeComponent = (props: NodeProps<any>) => {
  const presentationState = useNodePresentation(props);

  const background = "bg-black02";

  const classByPresentation: presentationClasses = {
    onRelated: "border-grey-300",
    onSelected: "border-grey-600",
  };
  return (
    <div
      className={nodeCls(presentationState, classByPresentation, background)}
    >
      <span className="text-gray-300 pointer-events-none absolute bottom-1 right-1 inline-block h-4 w-4">
        <FaDocker size="100%" />
      </span>
      <HandleTop className="!bg-gray-300" />
      <HandleBottom className="!bg-gray-300" />
    </div>
  );
};
