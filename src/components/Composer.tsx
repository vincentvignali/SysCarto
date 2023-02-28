import "reactflow/dist/style.css";

import { type FC, useState, useEffect } from "react";
import { PALETTE } from "@zendeskgarden/react-theming";
import { useStore, init } from "../dataManager/store";
import { Header } from "@/components/Header";
import "@/fonts/calps/Calps-Black.ttf";
import { Editor } from "./Editor";
import { IconContext } from "react-icons";
import { Loader } from "./Loader";
import { Drawer } from "./Drawer";
import { PanelsContainer } from "./Panel/PanelsContainer";

export const Composer: FC<{}> = () => {
  const [isStoreLoaded, setStoreLoaded] = useState(false);
  const [openEditor, setOpenEditor] = useState(false);
  const [isPhysicalPanel, setPhysicalPanel] = useState(true);
  const [isInfraPanel, setInfraPanel] = useState(true);
  const [isServicePanel, setServicePanel] = useState(true);

  useEffect(() => {
    new Promise<void>((resolve) => {
      init();
      resolve();
    })
      .then(() => {
        setStoreLoaded(true);
      })
      .catch(() => {
        console.log("Error loading the store");
      });
  }, []);

  const state = useStore();

  if (!isStoreLoaded) {
    return <Loader />;
  }

  return (
    <IconContext.Provider value={{ style: { width: "100%", height: "100%" } }}>
      <div className="flex h-full w-full flex-col bg-white">
        <Header
          isPhysicalPanel={isPhysicalPanel}
          setPhysicalPanel={setPhysicalPanel}
          isInfraPanel={isInfraPanel}
          setInfraPanel={setInfraPanel}
          isServicePanel={isServicePanel}
          setServicePanel={setServicePanel}
          setOpenEditor={setOpenEditor}
        ></Header>
        <Editor
          isOpen={openEditor}
          close={() => {
            setOpenEditor(false);
          }}
        />
        <Drawer />
        <PanelsContainer
          state={state}
          isPhysicalPanel={isPhysicalPanel}
          isInfraPanel={isInfraPanel}
          isServicePanel={isServicePanel}
        />
      </div>
    </IconContext.Provider>
  );
};
