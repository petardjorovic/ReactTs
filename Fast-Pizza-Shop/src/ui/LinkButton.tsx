import {
  Link,
  useNavigate,
} from 'react-router-dom';

export default function LinkButton({
  children,
  to,
}: {
  children: React.ReactNode;
  to: string;
}) {
  const navigate = useNavigate();
  const className =
    'text-sm text-blue-500 hover:text-blue-600 hover:underline';

  if (to === '-1')
    return (
      <button
        onClick={() => navigate(-1)}
        className={className}
      >
        {children}
      </button>
    );

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}
