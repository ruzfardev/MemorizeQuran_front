import { sample } from "effector";
import {
  appInitialized,
  locationAttached,
  navigateAttached,
  navigated,
} from "../events";
import { getAllIssuesFx, getAllSurahsFx, navigateFx } from "../effects";
import {
  $allIssues,
  $allSurahs,
  $currentUser,
  $location,
  $navigate,
  $telegramId,
  getTelegramIdFx,
  getUserFx,
  isUserExistFx,
  postUserFx,
} from "../stores";
import { NavigateParams } from "../types";
//* Navigation
sample({
  clock: navigateAttached,
  target: $navigate,
});
sample({
  clock: navigated,
  fn: (payload): NavigateParams =>
    typeof payload === "string" ? { to: payload } : payload,
  target: navigateFx,
});
sample({
  clock: locationAttached,
  target: $location,
});

//* App Initialization
sample({
  clock: appInitialized,
  target: getTelegramIdFx,
});

sample({
  clock: getTelegramIdFx.doneData,
  // filter: (telegramId) => !!telegramId,
  target: $telegramId,
});

sample({
  clock: $telegramId,
  target: isUserExistFx,
});
sample({
  clock: appInitialized,
  source: $currentUser,
  filter: (user) => !!user,
  target: getAllSurahsFx,
});

sample({
  clock: isUserExistFx.doneData,
  filter: (_, isExisting) => isExisting,
  source: $telegramId,
  target: getUserFx,
});
sample({
  clock: isUserExistFx.doneData,
  filter: (isExisting) => isExisting,
  target: getAllSurahsFx,
});

sample({
  clock: getUserFx.doneData,
  target: $currentUser,
});

//* If user not found, register him
sample({
  clock: isUserExistFx.doneData,
  source: $telegramId,
  filter: (_, isExisting) => !isExisting,
  fn: (telegramId, c) => {
    return {
      telegramId,
      fullName: "New User",
    };
  },
  target: postUserFx,
});

sample({
  clock: postUserFx.doneData,
  source: $telegramId,
  target: getUserFx,
});

sample({
  clock: getAllSurahsFx.doneData,
  target: $allSurahs,
});

sample({
  clock: getAllIssuesFx.doneData,
  target: $allIssues,
});
