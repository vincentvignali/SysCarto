import { type FC } from "react";
import cls from "classnames";
import {
  closeContextMenu,
  PanelIndex,
  setDetailed,
  useStore,
} from "@/dataManager/store";
import { ContextMenuButton } from "./ContextMenuButton";
import { elkLayoutBox } from "@/layout/graphLayouts/elk";

export type Corner = "tl" | "bl" | "tr" | "br";

export const ContextMenu: FC<{
  cursorAt: Corner;
  x: number;
  y: number;
  onClickAway: () => void;
}> = (props) => {
  const state = useStore();
  // console.log("🚀 ~ state", state);
  let nodeId = 0;
  const addNodes = () => {
    if (state.contextMenu?.rfInstance) {
      const lastId = state.contextMenu?.rfInstance
        .getNodes()
        .reduce((a, b) => (a.id > b.id ? a : b)).id;
      console.log("🚀 ~ lastId", lastId);
      const id = `${++nodeId}`;
      const newNode = {
        id,
        position: {
          x: 10,
          y: 10,
        },
        data: {
          label: `Node ${id}`,
        },
      };
      // nodeId = nodeId + 1;
      state.contextMenu?.rfInstance.addNodes(newNode);
    }
  };
  return (
    <div
      className={cls(
        "absolute z-40 w-24 overflow-hidden bg-white text-left text-white shadow-lg",
        { "rounded-r-md rounded-bl-md": props.cursorAt === "tl" }
      )}
      style={{
        left: props.x,
        top: props.y,
      }}
    >
      {state.contextMenu?.node ? (
        <>
          <ContextMenuButton
            onClick={() => {
              // TODO: Ask Peter how to properly refacto that so there is no `If` on line 37 wrapping the function call.
              if (state.contextMenu?.node) {
                setDetailed(state.contextMenu.node);
              }
              // if (nodeId) {
              //   deleteNode("nodeId");
              // }
              closeContextMenu();
            }}
          >
            View details
          </ContextMenuButton>
        </>
      ) : (
        <>
          <ContextMenuButton onClick={() => addNodes()}>
            Add Node
          </ContextMenuButton>
        </>
      )}
    </div>
  );
};
