import { FC } from "react";
import { Handle, Position } from "reactflow";
import cls from "classnames";
import { handleBaseClass } from "./style";

interface HandleProps {
  id?: string;
  className?: string;
}

export const HandleTop: FC<HandleProps> = (props) => {
  return (
    <Handle
      id={props.id}
      type="target"
      position={Position.Top}
      className={cls(handleBaseClass, props.className, "opacity-0")}
    />
  );
};

export const HandleRight: FC<HandleProps> = (props) => {
  return (
    <Handle
      id={props.id}
      type="target"
      position={Position.Right}
      className={cls(handleBaseClass, props.className, "opacity-0")}
    />
  );
};

export const HandleBottom: FC<HandleProps> = (props) => {
  return (
    <Handle
      id={props.id}
      type="source"
      position={Position.Bottom}
      className={cls(handleBaseClass, props.className, "opacity-0")}
    />
  );
};
export const HandleLeft: FC<HandleProps> = (props) => {
  return (
    <Handle
      id={props.id}
      type="target"
      position={Position.Left}
      className={cls(handleBaseClass, props.className, "opacity-0")}
    />
  );
};
