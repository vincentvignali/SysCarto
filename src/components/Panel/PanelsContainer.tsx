import {
  closeContextMenu,
  PanelIndex,
  setDetailed,
  setPanel,
  State,
} from "@/dataManager/store";
import { useRef, type FC } from "react";
import { useClickAway } from "react-use";
import { ReactFlowProvider } from "reactflow";
import { ContextMenu } from "../ContextMenu/ContextMenu";
import { Overlay } from "../Overlay";
import { PanelView } from "./PanelView";

interface IPanelContainer {
  state: State;
  isPhysicalPanel: boolean;
  isInfraPanel: boolean;
  isServicePanel: boolean;
}

export const PanelsContainer: FC<IPanelContainer> = ({
  state,
  isInfraPanel,
  isPhysicalPanel,
  isServicePanel,
}) => {
  const panelsContainerRef = useRef<HTMLDivElement | null>(null);
  useClickAway(panelsContainerRef, () => {
    setDetailed(null);
    closeContextMenu();
  });
  return (
    <div className="relative h-full w-full">
      {(state.hovered || state.crossPanelEdgesSelected.length >= 1) && (
        <Overlay store={state} observeRef={panelsContainerRef} />
      )}

      <div
        id="panelContainer"
        className="dark:bg-darky-600 relative flex h-full w-full bg-[#F3F0EE] pt-0 pb-2"
        ref={panelsContainerRef}
      >
        {isPhysicalPanel && (
          <div className="dark:bg-darky-800 ml-2 mr-1 h-full flex-auto resize-x rounded-[15px] bg-white">
            <ReactFlowProvider>
              <PanelView
                panelIndex={PanelIndex.PHYSICAL}
                onChange={setPanel}
                panel={state.panels[PanelIndex.PHYSICAL]}
              />
            </ReactFlowProvider>
          </div>
        )}

        {isInfraPanel && (
          <div className="dark:bg-darky-800 mx-1 h-full flex-auto resize-x rounded-[15px] bg-white">
            <ReactFlowProvider>
              <PanelView
                panelIndex={PanelIndex.INFRA}
                onChange={setPanel}
                panel={state.panels[PanelIndex.INFRA]}
              />
            </ReactFlowProvider>
          </div>
        )}

        {isServicePanel && (
          <div className="dark:bg-darky-800 ml-1 mr-2 h-full flex-auto resize-x rounded-[15px] bg-white">
            <ReactFlowProvider>
              <PanelView
                panelIndex={PanelIndex.SERVICE}
                onChange={setPanel}
                panel={state.panels[PanelIndex.SERVICE]}
              />
            </ReactFlowProvider>
          </div>
        )}
        {state.contextMenu && (
          <ContextMenu
            x={state.contextMenu.x}
            y={state.contextMenu.y}
            cursorAt={state.contextMenu.cursorAt}
            onClickAway={closeContextMenu}
          />
        )}
      </div>
    </div>
  );
};
