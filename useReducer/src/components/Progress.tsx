import { useQuiz } from "../context/QuizContext";

export default function Progress() {
  const { points, numQuestions, index, maxPossiblePoints, answer } = useQuiz();
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question {index + 1} / {numQuestions}
      </p>
      <p>
        Points {points} / {maxPossiblePoints}
      </p>
    </header>
  );
}
