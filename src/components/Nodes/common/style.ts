import { NodePresentation } from "@/hooks/useNodePresentation";
import cls from "classnames";

export interface presentationClasses {
  onRelated: string;
  onSelected: string;
}

export interface customPresentation {
  [key: string]: boolean;
}

export const nodeBaseClass =
  "h-full w-full flex flex-col items-center justify-center relative rounded border p-1 text-grey-700 font-mono duration-200";

export const handleBaseClass = "!w-1 !h-1 rounded-full !border-none";

export const nodeCls = (
  presentation: NodePresentation,
  classesByPresentation: presentationClasses,
  otherClass?: any
) => {
  return cls(
    nodeBaseClass,
    presentationClasses(presentation, [
      classesByPresentation.onRelated,
      classesByPresentation.onSelected,
    ]),
    otherClass
  );
};

export const presentationClasses = (
  presentation: NodePresentation,
  [onRelated, onSelected]: [string, string]
): Record<string, boolean> => ({
  "border-transparent": presentation === "inactive",
  [onSelected]: presentation === "selected",
  [onRelated]: presentation === "related",
  "opacity-30": presentation === "disabled",
  "opacity-100": presentation === "selected" || presentation === "related",
  "border-2": presentation === "selected",
  "border-[1]": presentation === "related",
  "shadow-md": presentation === "selected" || presentation === "related",
});
