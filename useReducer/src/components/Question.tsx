import type { ActionType, QuestionType } from "../App";
import Options from "./Options";

export type QuestionProps = {
  question: QuestionType;
  dispatch: React.ActionDispatch<[action: ActionType]>;
  answer: number | null;
};

export default function Question({
  question,
  dispatch,
  answer,
}: QuestionProps) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}
