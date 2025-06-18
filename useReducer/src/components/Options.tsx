import { useQuiz, type QuestionType } from "../context/QuizContext";

export default function Options({ question }: { question: QuestionType }) {
  const { dispatch, answer } = useQuiz();
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
