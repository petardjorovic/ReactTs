import { useEffect } from "react";
import { useQuiz } from "../context/QuizContext";

export default function Timer() {
  const { dispatch, secondsRemaining } = useQuiz();
  const min = Math.floor(secondsRemaining / 60);
  const sec = secondsRemaining % 60;
  useEffect(() => {
    const id = setInterval(function () {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);
  return (
    <p className="timer">
      {min < 10 && "0"}
      {min}:{sec < 10 && "0"}
      {sec}
    </p>
  );
}
