import { useStore } from "@/dataManager/store";
import { Metadata } from "@/dataManager/types";
import { Chip } from "@material-tailwind/react";
import { FC } from "react";
import { nodeIcones } from "./Nodes/common/nodeIcones";

interface DrawerProps {}

/** Component dynamically displayed based on the selected nodes
 * Selected nodes are passed by props.
 * Then the drawer renders informations about the node(s)
 */
export const Drawer: FC<DrawerProps> = () => {
  const store = useStore();
  const node = store.detailed;

  const dataKeys: Array<string | number> = [];
  const dataValues: Array<string | number> = [];

  /** Clean the data */
  const data: Metadata = { ...node?.data };
  const creationTime = data["_created_at"];
  delete data["_created_at"];
  const updatedTime = data["_updated_at"];
  delete data["_updated_at"];
  const creator = data["created_by"];
  delete data["created_by"];
  const hostId = data["host_id"];
  delete data["host_id"];
  const hostedAgent = data["hosted_agent"];
  delete data["hosted_agent"];
  const type = ["type"];
  delete data["type"];
  const id = ["id"];
  delete data["id"];
  /** Clean the Cpu Data */
  if (data.cpu) {
    Object.entries(data.cpu).map((cpuData) => {
      data[`(cpu) ${cpuData[0]}`] = cpuData[1];
      delete data["cpu"];
    });
  }

  /** Populate the component data */
  Object.entries(data).map((data) => {
    dataValues.push(data[1]);
    dataKeys.push(data[0]);
  });

  let Icon = node?.type ? nodeIcones[node.type] : nodeIcones.empty;
  if (node?.data.machine_type) {
    Icon = nodeIcones[node.data.machine_type];
  }
  return (
    <div
      className={`${
        node ? "translate-x-0" : "-translate-x-full"
      } absolute z-10 flex h-full w-1/4 flex-col items-center justify-between rounded-sm bg-white bg-opacity-70 transition-all duration-500`}
    >
      <header className="w-full p-4 text-lg font-bold bg-white">
        Node Details
      </header>
      <div className="flex w-full gap-5 pt-5 justify-cenfter h-1/6 text-grey-400">
        <div className="relative flex justify-center w-12 h-12 p-2 m-auto border-2 rounded-md cursor-pointer border-grey-700 text-grey-700">
          <Icon size={"100%"} />
        </div>
      </div>
      <div className="flex flex-col justify-center w-full h-full p-3 bg-transparent ">
        {Object.entries(data).length <= 0 && (
          <Chip
            className="w-3/4 m-auto italic font-medium text-center text-white capitalize border-2 border-grey-800 bg-grey-600"
            value={"No data to display."}
          />
        )}
        {Object.entries(data).map((entry) => (
          <div
            className="w-full my-1 overflow-auto border border-1 rounded-xl border-grey-800"
            key={`${entry[0]} - ${entry[1]}`}
          >
            <Chip
              className="w-1/6 h-full py-2 text-xs select-text bg-grey-800 px-[0.5rem] "
              value={`${entry[0]}`}
            />
            <Chip
              className="ml-2 text-xs text-black capitalize bg-transparent select-text"
              value={`${entry[1]}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
