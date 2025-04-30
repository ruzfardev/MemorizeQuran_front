import { createEvent } from "effector";
import { Location, NavigateFunction } from "react-router";
import { NavigateEventPayload } from "../types";

export const appInitialized = createEvent();
export const userNotFound = createEvent<{
  telegramId: number;
  fullName: string;
}>();

//* Navigation
export const navigateAttached = createEvent<NavigateFunction>();
export const navigated = createEvent<NavigateEventPayload>();
export const locationAttached = createEvent<Location>();
export const pageBack = createEvent();
