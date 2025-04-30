import { sample } from "effector";
import { createIssueFx, getIssueFx } from "../effects";
import { issueCreated, issueRequested } from "../events";
import { navigated } from "@/shared/state";
import { $issue } from "../stores";

sample({
  clock: issueCreated,
  target: createIssueFx,
});
sample({
  clock: createIssueFx.doneData,
  fn: () => "/tasks",
  target: navigated,
});

sample({
  clock: issueRequested,
  target: getIssueFx,
});

sample({
  clock: getIssueFx.doneData,
  target: $issue,
});
