import { pending } from "patronum";
import { createIssueFx, getIssueFx } from "../effects";
import { createStore } from "effector";
import { Issue } from "@/shared/models";

export const $isIssueCreating = pending([createIssueFx]);
export const $issue = createStore<Issue>(null);
export const $issueFetching = pending([getIssueFx]);
