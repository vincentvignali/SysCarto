import { FC } from "react";

export const TitleBar: FC<{ icon: FC<any>; title: string }> = (props) => (
  <div className="flex flex-col items-center justify-center w-full text-gray-600 space-y-0.5">
    <span className="flex-none block w-4 h-4">
      <props.icon size="100%" />
    </span>
    <div className="w-full text-center text-gray-500">
      <p className="w-full overflow-hidden text-ellipsis text-[8px]">
        {props.title}
      </p>
    </div>
  </div>
);
