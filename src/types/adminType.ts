export type LessonType = {
  id?: number;
  title?: string;
  image?: string;

  created_at?: string;
  updated_at?: string;
  exam?: ExamType[];
  randomExam?: ExamType[];
};

export type ExamType = {
  id?: number;
  lesson_id?: number;
  title?: string;
  image?: string;
  description?: string;
  answer1?: string;
  answer2?: string;
  answer3?: string;
  answer4?: string;
  answer5?: string;
  answerArray?: string[];
  created_at?: string;
  updated_at?: string;
  userAnswer?: string;
  isCorrect?: number;
  lesson?: {
    id?: number;
    title?: string;
  };
};

export type AnsweredArrayType = {
  answerId?: number;
  answer?: string;
};

export type UserExamListType = {
  id?: number;
  lesson_id?: number;
  user_id?: number;
  time?: number;
  lesson?: {
    title?: string;
    image?: string;
  };
  user?: {
    id?: number;
    firstname?: string;
    phone?: string;
  };
  answers?: AnswersType;
  created_at?: string;
  updated_at?: string;
};

export type AnswersType = [
  {
    answer1?: string;
    answer2?: string;
    answer3?: string;
    answer4?: string;
    answer5?: string;
    user_answer?: string;
    is_correct?: boolean;
    exam?: {
      title?: string;
      description?: string;
      image?: string;
      answer1?: string;
    };
  },
];
