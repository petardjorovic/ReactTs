import { createContext, useContext, useEffect, useReducer } from "react";

export type QuestionType = {
  question: string;
  options: [string, string, string, string];
  correctOption: number;
  points: number;
  id: string;
};

type InitState = {
  questions: QuestionType[];
  status: string;
  index: number;
  answer: number | null;
  points: number;
  highscore: number;
  secondsRemaining: number;
};

export type ActionType =
  | { type: "dataReceived"; payload: QuestionType[] }
  | { type: "dataFailed" }
  | { type: "start" }
  | { type: "newAnswer"; payload: number }
  | { type: "nextQuestion" }
  | { type: "finish" }
  | { type: "restart" }
  | { type: "tick" };

const initialState: InitState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 0,
};

const SECS_PER_QUESTION = 30;

function reducer(state: InitState, action: ActionType) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: SECS_PER_QUESTION * state.questions.length,
      };
    case "newAnswer": {
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    }
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highscore: state.highscore,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
        highscore:
          state.secondsRemaining === 0
            ? state.points > state.highscore
              ? state.points
              : state.highscore
            : state.highscore,
      };
    default:
      throw new Error("Unknown type");
  }
}

type QuizCtxType = {
  questions: QuestionType[];
  status: string;
  index: number;
  answer: number | null;
  points: number;
  highscore: number;
  secondsRemaining: number;
  dispatch: React.ActionDispatch<[acttion: ActionType]>;
  numQuestions: number;
  maxPossiblePoints: number;
};

const QuizContext = createContext<QuizCtxType | undefined>(undefined);

function QuizProvider({ children }: { children: React.ReactNode }) {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (total, current) => total + current.points,
    0
  );

  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => {
        console.log("Error:", err);
        dispatch({ type: "dataFailed" });
      });
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        dispatch,
        numQuestions,
        maxPossiblePoints,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (!context)
    throw new Error("QuizContext must be used within the QuizProvider");
  return context;
}

export { QuizProvider, useQuiz };
