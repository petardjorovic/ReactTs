import type { QuestionType } from "../App";

type QuestionProps = {
  question: QuestionType;
};

export default function Question({ question }: QuestionProps) {
  return (
    <div className="options">
      <h4>{question.question}</h4>
      {question.options.map((option) => (
        <button key={option} className="btn btn-option">
          {option}
        </button>
      ))}
    </div>
  );
}
