import cls from "classnames";
import { EdgePresentation } from "@/hooks/useEdgePresentation";

export const edgeBaseClassStyle = "fill-none";
export const arrowBaseClassStyle = "stroke-2";

export const edgeClassesByPresentation = (
  presentation: EdgePresentation
): Record<string, boolean> => ({
  "stroke-kale-200 stroke-[2px]": presentation === "normal",
  "stroke-kale-300 stroke-[4px]": presentation === "hovered",
  "stroke-kale-600 stroke-[4px]": presentation === "selected",
});
export const arrowClassesByPresentation = (
  presentation: EdgePresentation
): Record<string, boolean> => ({
  "fill-slate-200": presentation === "normal",
  "fill-slate-400": presentation === "hovered",
  "fill-slate-600": presentation === "selected",
});
