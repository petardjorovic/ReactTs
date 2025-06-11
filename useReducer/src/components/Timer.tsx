import { useEffect } from "react";
import type { ActionType } from "../App";

type TimerProps = {
  dispatch: React.ActionDispatch<[action: ActionType]>;
  secondsRemaining: number;
};

export default function Timer({ dispatch, secondsRemaining }: TimerProps) {
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
