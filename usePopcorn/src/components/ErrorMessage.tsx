type ErrorMessageProps = {
  error: string;
};

export default function ErrorMessage({ error }: ErrorMessageProps) {
  return <div className="error">⛔ {error}</div>;
}
