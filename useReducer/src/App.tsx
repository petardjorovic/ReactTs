import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import ErrorComponent from "./components/ErrorComponent";
import StartScreen from "./components/StartScreen";

type QuestionType = {
  question: string;
  options: [string, string, string, string];
  correctOption: number;
  points: number;
  id: string;
};

type InitState = {
  questions: QuestionType[];
  status: string;
};

const initialState: InitState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
};

type ActionType =
  | { type: "dataReceived"; payload: QuestionType[] }
  | { type: "dataFailed" };

function reducer(state: InitState, action: ActionType) {
  console.log(state, action);
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    default:
      throw new Error("Unknown type");
  }
}

function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

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
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <ErrorComponent />}
        {status === "ready" && <StartScreen />}
      </Main>
    </div>
  );
}

export default App;
