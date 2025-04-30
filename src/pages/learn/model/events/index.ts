import { PostIssue } from "@/shared/models";
import { createEvent } from "effector";

export const issueCreated = createEvent<PostIssue>();
export const issueRequested = createEvent<number>();
export const issueUpdated = createEvent<PostIssue>();
