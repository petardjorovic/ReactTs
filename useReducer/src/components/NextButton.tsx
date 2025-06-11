import type { ActionType } from "../App";

type NextButtonProps = {
  answer: number | null;
  dispatch: React.ActionDispatch<[action: ActionType]>;
  index: number;
  numQuestions: number;
};

export default function NextButton({
  answer,
  dispatch,
  index,
  numQuestions,
}: NextButtonProps) {
  if (answer === null) return;
  if (index < numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  }

  if (index === numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
  }
}
