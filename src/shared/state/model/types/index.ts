import {
  Location,
  NavigateFunction,
  NavigateOptions,
  To,
} from "react-router-dom";

export interface NavigateParams extends NavigateOptions {
  to: To;
}

export interface NavigateFxPayload extends NavigateParams {
  navigate: NavigateFunction | null;
  location: Location | null;
}

export type NavigateEventPayload = string | NavigateParams;
