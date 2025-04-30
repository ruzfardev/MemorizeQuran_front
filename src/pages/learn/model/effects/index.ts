import { createIssue, getIssue } from "@/shared/api";
import { PostIssue } from "@/shared/models";
import { createEffect } from "effector";

export const createIssueFx = createEffect((body: PostIssue) => {
  return createIssue(body);
});
export const getIssueFx = createEffect((id: number) => {
  return getIssue(id);
});
