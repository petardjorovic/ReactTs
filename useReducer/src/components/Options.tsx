import type { ActionType, QuestionType } from "../App";

type OptionsProps = {
  question: QuestionType;
  dispatch: React.ActionDispatch<[action: ActionType]>;
  answer: number | null;
};

export default function Options({ question, dispatch, answer }: OptionsProps) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, idx) => (
        <button
          key={option}
          className={`btn btn-option ${idx === answer ? "answer" : ""} ${
            hasAnswered
              ? question.correctOption === idx
                ? "correct"
                : "wrong"
              : ""
          }`}
          onClick={() => dispatch({ type: "newAnswer", payload: idx })}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
