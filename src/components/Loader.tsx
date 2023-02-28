import { FC } from "react";

interface LoaderProps {
  panelScoped?: boolean;
}

export const Loader: FC<LoaderProps> = ({ panelScoped }) => {
  return (
    <div
      className={"z-10 flex items-center justify-center h-[100vh] w-[100vw]"}
    >
      <div className="flex justify-center w-24 h-24 border-8 rounded-full animate-spin border-grey-400">
        <div className="w-16 h-16 m-auto border-4 rounded-full border-y-grey-500"></div>
      </div>
    </div>
  );
};
