import {
  AnsweredArrayType,
  ExamType,
  LessonType,
  UserExamListType,
  
} from "@/types/adminType";

import { atom } from "recoil";

export const checkedListAtom = atom<string[]>({
  key: "checked_list_atom",
  default: [],
});

export const totalPageAtom = atom<number>({
  key: "total_page_atom",
  default: 1,
});

export const fileAtom = atom<File | null>({
  key: "file_atom",
  default: null, // This sets the initial state to null
});


export const dataSavedAtom = atom({
  key: "dataSavedAtom",
  default: false,
});

export const ActiveRoleAtom = atom({
  key: "ActiveRoleAtom",
  default: "",
});

export const lessonListAtom = atom<LessonType[]>({
  key: "lessonListAtom",
  default: [],
});

export const lessonDetailAtom = atom<LessonType>({
  key: "lessonDetailAtom",
  default: {},
});

export const examListAtom = atom<ExamType[]>({
  key: "examListAtom",
  default: [],
});

export const examDetailAtom = atom<ExamType>({
  key: "examDetailAtom",
  default: {},
});

export const lessonAnsweredArrayAtom = atom<AnsweredArrayType[]>({
  key: 'lessonAnsweredArrayAtom',
  default: [],
});

export const ActiveUserIdAtom = atom({
  key: 'ActiveUserIdAtom',
  default: 0,
});

export const userExamListAtom = atom<UserExamListType[]>({
  key: 'userExamListAtom',
  default: [],
});

export const userExamDetailAtom = atom<UserExamListType>({
  key: 'userExamDetailAtom',
  default: {},
});

export const ExamTimerAtom = atom({
  key: 'ExamTimerAtom',
  default: 15,
});

export const ExamTimerShowAtom = atom({
  key: 'ExamTimerShowAtom',
  default: false,
});

export const ExamTimeEndAtom = atom({
  key: 'ExamTimeEndAtom',
  default: false,
});


export const AdminLessonUsersExamListAtom = atom<UserExamListType[]>({
  key: 'AdminLessonUsersExamListAtom',
  default: [],
});



