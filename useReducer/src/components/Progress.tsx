type ProgressProps = {
  points: number;
  numQuestions: number;
  index: number;
  maxPossiblePoints: number;
  answer: number | null;
};

export default function Progress({
  points,
  numQuestions,
  index,
  maxPossiblePoints,
  answer,
}: ProgressProps) {
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
