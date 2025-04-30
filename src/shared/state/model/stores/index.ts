import { Issue, Surah, User } from "@/shared/models";
import { createEffect, createStore } from "effector";
import { Location, NavigateFunction } from "react-router";
import { getUser, isUserExist, postUser } from "@/shared/api";
import { pending } from "patronum";
import WebApp from "@twa-dev/sdk";

export const getUserFx = createEffect((id: number) => {
  return getUser(id);
});
export const postUserFx = createEffect((body: any) => {
  return postUser(body);
});

export const isUserExistFx = createEffect((telegramId: number) => {
  return isUserExist(telegramId);
});
export const getTelegramIdFx = createEffect(() => {
  const telegramId = WebApp.initDataUnsafe?.user?.id;
  if (!telegramId) return 970956519;
  return telegramId;
});

export const $currentUser = createStore<User | null>(null);
export const $telegramId = createStore<number | null>(null);
export const $allSurahs = createStore<Surah[]>([]);
export const $allIssues = createStore<Issue[]>([]);
export const $isUserRegisterInProgress = pending([
  postUserFx,
  getUserFx,
  isUserExistFx,
  getTelegramIdFx,
]);

export const $navigate = createStore<NavigateFunction | null>(null);
export const $location = createStore<Location | null>(null);
