import React, { type FC } from "react";
import { SearchBar } from "@/components/SearchBar";
import { Toggle } from "./Toggle";
import { HiOutlinePencil } from "react-icons/hi2";

interface Iheader {
  isPhysicalPanel: boolean;
  setPhysicalPanel: React.Dispatch<React.SetStateAction<boolean>>;
  isInfraPanel: boolean;
  setInfraPanel: React.Dispatch<React.SetStateAction<boolean>>;
  isServicePanel: boolean;
  setServicePanel: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenEditor: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: FC<Iheader> = ({
  isPhysicalPanel,
  setPhysicalPanel,
  isInfraPanel,
  setInfraPanel,
  isServicePanel,
  setServicePanel,
  setOpenEditor,
}) => {
  return (
    <header className="dark:border-darky-700 dark:bg-darky-800 w-full bg-[#F3F0EE] px-3 py-0">
      <div className="flex flex-row items-center">
        <div className="p-0 basis-1/3">
          <a
            href="/"
            className="self-center px-4 text-3xl rounded dark:hover:bg-darky-700 font-situation text-kale-700 hover:bg-grey-100 dark:text-white"
          >
            SITUATION
          </a>
        </div>
        <div className="basis-1/3">
          <SearchBar />
        </div>
        <div className="basis-1/3">
          <div className="flex flex-row justify-between">
            <div className="flex items-center space-x-4">
              <Toggle
                label="Physical"
                initialValue={isPhysicalPanel}
                onSwitchOff={() => setPhysicalPanel(false)}
                onSwitchOn={() => setPhysicalPanel(true)}
              />
              <Toggle
                label="Infrastructure"
                initialValue={isInfraPanel}
                onSwitchOff={() => setInfraPanel(false)}
                onSwitchOn={() => setInfraPanel(true)}
              />
              <Toggle
                label="Service"
                initialValue={isServicePanel}
                onSwitchOff={() => setServicePanel(false)}
                onSwitchOn={() => setServicePanel(true)}
              />
            </div>
            <button
              className="flex items-center justify-center flex-none h-full rounded-full dark:hover:bg-darky-700 text-grey-700 hover:bg-grey-100 dark:text-white"
              onClick={() => {
                setOpenEditor(true);
              }}
            >
              <HiOutlinePencil className="p-2" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
