import type { ActionType } from "../App";

type NextButtonProps = {
  answer: number | null;
  dispatch: React.ActionDispatch<[action: ActionType]>;
};

export default function NextButton({ answer, dispatch }: NextButtonProps) {
  if (answer === null) return;

  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      Next
    </button>
  );
}
