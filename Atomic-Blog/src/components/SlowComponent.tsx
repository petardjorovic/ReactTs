export default function SlowComponent() {
  // If this is too slow on your maching, reduce the `length`
  const words = Array.from({ length: 10_000 }, () => "WORD");

  return (
    <ul>
      {words.map((word, i) => (
        <li key={i}>
          {i}: {word}
        </li>
      ))}
    </ul>
  );
}
