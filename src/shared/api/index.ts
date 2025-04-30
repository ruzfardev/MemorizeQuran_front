import {
  Issue,
  PostIssue,
  RepetitionPlan,
  RepetitionPlanDay,
  Surah,
  User,
} from "../models";
import { api } from "./_base";

//* User Actions
export const getUser = async (telegramId: number): Promise<User> => {
  const response = await api.get("/User", {
    params: {
      telegramId,
    },
  });
  return response.data.result;
};

export const isUserExist = async (telegramId: number): Promise<boolean> => {
  const response = await api.get("/User", {
    params: {
      telegramId,
    },
  });
  return response.data.result.isExisting;
};

export const postUser = async (body: any): Promise<{ id: number }> => {
  const response = await api.post("/User", {
    telegramId: body.telegramId,
    fullName: body.fullName,
  });
  return response.data.result;
};

//* Other API
export const getAllSurahs = async (): Promise<Surah[]> => {
  const response = await api.get("/Surah/GeAllSurahs");
  return response.data;
};

//* Issue Actions
export const getAllIssues = async (userId: number): Promise<Issue[]> => {
  const response = await api.get(
    `/Issues/GetAllIssue?userId=${userId}&pageNumber=1&pageCount=10`
  );
  return response.data;
};
export const createIssue = async (body: PostIssue): Promise<void> => {
  const response = await api.post("/Issues/CreateIssue", body);
  return response.data;
};

export const getIssue = async (id: number): Promise<Issue> => {
  const response = await api.get(`/Issues/GetIssueById?Id=${id}`);
  return response.data;
};
export const getRepetitionPlanForMonth = async (
  userId: number,
  date: string
): Promise<RepetitionPlanDay[]> => {
  const response = await api.get(
    `/RepetitionPlans/GetRepetitionPlanForMonth?userId=${userId}&date=${date}`
  );
  return response.data;
};

export const getRepetitionPlanForDay = async (
  userId: number,
  date: string
): Promise<RepetitionPlan[]> => {
  const response = await api.get(
    `/RepetitionPlans/GetRepetitionPlanForDate?userId=${userId}&date=${date}`
  );
  return response.data;
};

export const changePlanStatus = async (id: number): Promise<void> => {
  const response = await api.post(
    `/RepetitionPlans/ChangeIsCompleted?repetitionPlanId=${id}`
  );
  return response.data;
};
