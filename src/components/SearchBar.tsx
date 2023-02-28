import React, { useRef, useState, type FC } from "react";
import { HiMagnifyingGlass, HiOutlineXMark } from "react-icons/hi2";
import cls from "classnames";

import {
  computeAbsolute,
  useStore,
  visitNodes,
  State,
  disableNode,
  enableNode,
} from "../dataManager/store";
import { Node, Edge } from "reactflow";

/**
 * Search utilities
 */

// constants (they are useful if we want to hide the other nodes)
const backupKey = "__search";
const backupPositionKey = "position";
const backupParentNodeKey = "parentNode";
const minSearchLength = 3;
const minDurationMillisec = 500;

// the backup function stores initial node information that can be
// modified during the search
const backup = (node: Node<any>): Node<any> => {
  node.data[backupKey] = {};
  node.data[backupKey][backupPositionKey] = { ...node.position };
  node.data[backupKey][backupParentNodeKey] = node.parentNode;
  return node;
};

// restore makes the reverse of the backup function
const restore = (node: Node<any>): Node<any> => {
  if (backupKey in node.data) {
    const backup = node.data[backupKey];

    if (backupPositionKey in backup) {
      node.position = { ...backup[backupPositionKey] };
    }

    if (backupParentNodeKey in backup) {
      node.parentNode = backup[backupParentNodeKey];
      node.extent = "parent";
    }

    delete node.data[backupKey];
  }
  return node;
};

// isolate modifies a node such that it will node depend on its potential
// parents (in particular it updates its position)
const isolate = (store: State, node: Node<any>): Node<any> => {
  // modify the node
  node.position = computeAbsolute(store, node);
  node.parentNode = undefined;
  node.extent = undefined;
  return node;
};

const keepNode = (store: State) => {
  return (node: Node<any>): Node<any> => {
    node = backup(node);
    // remove parent deps & update position
    node = isolate(store, node);
    return node;
  };
};

const filterNode = (nodeType: string) => {
  return (node: Node<any>): boolean => {
    return node.type !== undefined && node.type.startsWith(nodeType);
    // return node.id === "service03";
  };
};

const hideEdge = (edge: Edge<any>): Edge<any> => {
  // edge.hidden = true;
  return edge;
};

const hideNode = (node: Node<any>): Node<any> => {
  // node.hidden = true;
  node.style = { ...node.style, opacity: 0.4 };
  return node;
};

const disableNodeFactory = (store: State) => {
  return (node: Node<any>): Node<any> => {
    disableNode(node);
    return node;
  };
};

export const SearchBar: FC<{}> = () => {
  // search bar focus state
  const [focus, setFocus] = useState(false);

  // reference to input search
  const inputRef: React.MutableRefObject<HTMLInputElement | null> =
    useRef(null);

  const store = useStore();

  const className = cls(
    "flex flex-row mx-0 rounded-[30px] bg-grey-100 duration-200 w-2/3 dark:bg-darky-600 border-[1px] items-center",
    {
      "border-grey-700 dark:border-darky-400": focus,
      "border-grey-100 dark:border-darky-600": !focus,
    }
  );

  const iconClassName = cls("mx-2 duration-200", {
    "text-grey-400": !focus,
    "text-blue-700 dark:text-white": focus,
  });

  const inputClassName = cls(
    "h-full w-full p-2 bg-grey-100 pr-2 outline-none duration-200 dark:bg-darky-600 dark:text-white",
    {
      "placeholder:text-gray-400 dark:placeholder:text-darky-500": !focus,
      "placeholder:text-slate-400 dark:placeholder:text-darky-400": focus,
    }
  );

  const clearClassName = cls("align-text-bottom text-2xl duration-200", {
    "text-slate-100 pointer-events-none dark:text-darky-600": !focus,
    "text-sky-700 hover:text-black dark:text-white": focus,
  });

  // state for previous event
  const [lastEventTs, setLastEventTs] = useState(new Event("none").timeStamp);
  const [lastText, setLastText] = useState("");

  // this is called when the input change
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (inputRef.current) {
      // grab value
      const text = inputRef.current.value;

      // here we trigger the search if the text is long enough and a previous
      // search has not be triggered less than 500ms before
      if (
        text.length >= minSearchLength &&
        Math.abs(event.timeStamp - lastEventTs) > minDurationMillisec
      ) {
        setLastEventTs(event.timeStamp);
        // f keeps the node that match the search
        const f = filterNode(text);
        // disable the other nodes
        visitNodes({
          onNode: disableNodeFactory(store),
          filterNode: (node) => !f(node), // filter on other nodes
        });
      }

      // we reset if we go back to a shorter text
      if (lastText.length >= minSearchLength && text.length < minSearchLength) {
        reset();
      }

      setLastText(text);
    }
  };

  const reset = () => {
    visitNodes({
      filterNode: () => true,
      onNode: (node: Node<any>) => {
        enableNode(node);
        return node;
      },
    });
  };

  const clear = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
      reset();
    }
  };

  return (
    <div className={className}>
      <span className={iconClassName}>
        <HiMagnifyingGlass />
      </span>
      <input
        className={inputClassName}
        type="text"
        ref={inputRef}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        placeholder="Find node..."
        onChange={onChange}
      />
      <span className={iconClassName + " cursor-pointer"} onClick={clear}>
        <a className={clearClassName}>
          <HiOutlineXMark />
        </a>
      </span>
    </div>
  );
};
