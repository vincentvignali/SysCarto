import { Handle, Position, NodeProps } from "reactflow";

import { NodeComponent } from "@/components/types";

/**
 * @param props
 * @returns a Component used by reactFlow to render the node
 */
export const Region: NodeComponent = (props) => {
  return (
    <div
      className="relative p-4 bg-purple-500 rounded-lg shadow-lg opacity-[0.1]"
      style={{
        width: props.data.size?.width || 100,
        height: props.data.size?.height || 100,
      }}
    >
      <Handle type="source" position={Position.Bottom} className={""} />
      <Handle type="target" position={Position.Top} className={""} />
    </div>
  );
};
