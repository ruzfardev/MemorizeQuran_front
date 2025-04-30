export interface User {
  userId: number;
  isExisting: boolean;
  telegramId: number;
  fullName: string;
}

export interface Surah {
  id: number;
  name: string;
  ayahSize: number;
}

export interface Issue {
  id: number;
  userId: number;
  repetitionCount: number;
  durationMinutes: number;
  dateLearned: string;
  notifyAt: string;
  from: number;
  to: number;
  surahId: number;
  learnTypeId: number;
}

export interface PostIssue {
  learnTypeId: number;
  surahId: number | null;
  from: number;
  to: number;
  notifyAt: string;
  dateLearned: string;
  durationMinutes: number;
  repetitionCount: number;
  userId: number;
}

export interface RepetitionPlanDay {
  day: number;
  dayOfWeek: number;
  dayOfWeekDisplayName: string;
  hasPlan: boolean;
  today: string;
}
export interface RepetitionPlan {
  id: number;
  userId: number;
  issuesId: number;
  durationTime: string;
  surahId: number;
  surahName: string;
  from: number;
  to: number;
  repetitionCount: number;
  repetitionDay: number;
  isCompleted: boolean;
  remindMe: boolean;
}
