import { FC } from "react";

export const ContextMenuButton: FC<
  Omit<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    "className"
  >
> = (props) => {
  return (
    <button
      className="block w-full px-2 py-1 text-sm text-left text-grey-800 hover:bg-grey-200"
      onClick={props.onClick}
      {...props}
    >
      {props.children}
    </button>
  );
};
