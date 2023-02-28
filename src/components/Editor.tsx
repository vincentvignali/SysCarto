import React, { type FC, useCallback, useState, useRef } from "react";
import {
  PanelIndex,
  setPanel,
  State,
  useStore,
  type Panel,
} from "../dataManager/store";
import Monaco, { type Monaco as MonacoType } from "@monaco-editor/react";
// monaco.editor.IStandaloneCodeEditor
import {
  editor,
  IKeyboardEvent,
  KeyCode,
} from "monaco-editor/esm/vs/editor/editor.api";
import cls from "classnames";
import { HiCheck } from "react-icons/hi2";
export interface EditorProps {
  isOpen: boolean;
  close: () => void;
}

const useStyle = (panelTab: PanelIndex) => {
  return (panelName: PanelIndex) => {
    return cls("px-3 py-1 rounded-[10px]", {
      "bg-blue-500 text-white": panelTab === panelName,
      "hover:text-grey-800 text-grey-600": panelTab !== panelName,
    });
  };
};

const useDataSaver = (
  editorRef: React.MutableRefObject<editor.IStandaloneCodeEditor | null>
) => {
  return (tab: PanelIndex) => {
    if (editorRef.current) {
      const raw = JSON.parse(editorRef.current.getValue());
      setPanel(tab, raw);
    }
  };
};

export const Editor: FC<React.PropsWithChildren<EditorProps>> = ({
  isOpen,
  close,
}: React.PropsWithChildren<EditorProps>) => {
  // reference to monaco editor
  const editorRef: React.MutableRefObject<editor.IStandaloneCodeEditor | null> =
    useRef(null);

  // panel selector
  // using a ref is necessary because the panelTab is passed
  // to a listener (the listener will not update with the state
  // but it can access the ref to the state)
  // see https://medium.com/geographit/accessing-react-state-in-event-listeners-with-usestate-and-useref-hooks-8cceee73c559
  const [panelTab, _setPanelTab] = useState(PanelIndex.PHYSICAL);
  const panelTabRef = useRef(panelTab);
  const setPanelTab = (tab: PanelIndex) => {
    // set the ref
    panelTabRef.current = tab;
    // set the state
    _setPanelTab(tab);
  };

  // fetch data
  const panel: Panel = useStore(
    useCallback((state: State) => state.panels[panelTab], [panelTab])
  );
  // turn data into raw string
  const raw = JSON.stringify(panel, null, 2);

  const className = useStyle(panelTab);

  const savePanel = useDataSaver(editorRef);

  const onMount = (
    editor: editor.IStandaloneCodeEditor,
    monaco: MonacoType
  ) => {
    // set the editor
    editorRef.current = editor;

    // set the key listener
    editorRef.current.onKeyDown((event: IKeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.keyCode === KeyCode.KeyS) {
        event.preventDefault();
        savePanel(panelTabRef.current);
      }
    });
  };

  return (
    <main
      className={
        "bg-gray-900 fixed inset-0 z-10 transform overflow-hidden bg-opacity-25 ease-in-out " +
        (isOpen
          ? " translate-x-0 opacity-100 transition-opacity duration-500  "
          : " translate-x-full opacity-0 transition-all delay-500  ")
      }
    >
      <section
        className={
          "shadow-xl delay-400 absolute right-0 h-full w-screen max-w-xl transform bg-white transition-all duration-500 ease-in-out" +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <article className="relative flex h-full w-screen max-w-xl flex-col space-y-2 overflow-y-scroll pb-10">
          <div className="flex items-center justify-between">
            <header className="p-4 text-lg font-bold">Data editor</header>
            <div className="mx-4">
              <button
                className="rounded-full border-2 border-green-600 p-2 text-green-600 hover:bg-green-600 hover:text-white"
                onClick={() => savePanel(panelTab)}
              >
                <HiCheck />
              </button>
            </div>
          </div>

          <div className="flex w-full justify-center pb-4">
            <div className="bg-gray-100 rounded-2xl p-2">
              <button
                className={className(PanelIndex.PHYSICAL)}
                onClick={() => {
                  setPanelTab(PanelIndex.PHYSICAL);
                }}
              >
                Physical
              </button>
              <button
                className={className(PanelIndex.INFRA)}
                onClick={() => {
                  setPanelTab(PanelIndex.INFRA);
                }}
              >
                Infrastructure
              </button>
              <button
                className={className(PanelIndex.SERVICE)}
                onClick={() => {
                  setPanelTab(PanelIndex.SERVICE);
                }}
              >
                Service
              </button>
            </div>
          </div>
          <Monaco
            height="90vh"
            defaultLanguage="json"
            value={raw}
            onMount={onMount}
            language="json"
          />
        </article>
      </section>
      <section
        className="h-full w-screen cursor-pointer"
        onClick={close}
      ></section>
    </main>
  );
};
