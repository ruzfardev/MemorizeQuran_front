import { getAllIssues, getAllSurahs } from "@/shared/api";
import { attach, createEffect } from "effector";
import { $location, $navigate } from "../stores";
import { NavigateFxPayload, NavigateParams } from "../types";
import { resolveUrl } from "../lib";
export const navigateFx = attach({
  source: { navigate: $navigate, location: $location },
  mapParams: (params: NavigateParams, { navigate, location }) => ({
    ...params,
    navigate,
    location,
  }),
  effect: createEffect(
    ({ navigate, location, to, ...options }: NavigateFxPayload) => {
      if (!navigate || !location) return;
      console.log("navigating", to);
      if (typeof to === "string") {
        if (to === "" || to.startsWith("/")) {
          return navigate(to, options);
        }

        if (to.includes("..")) {
          return navigate(resolveUrl(location.pathname, to), options);
        }

        return navigate(`${location.pathname}/${to}`, options);
      }

      return navigate(to, options);
    }
  ),
});

//* Other effects
export const getAllSurahsFx = createEffect(() => {
  return getAllSurahs();
});

export const getAllIssuesFx = createEffect((userId: number) => {
  return getAllIssues(userId);
});
