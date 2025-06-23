import { useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';

function ErrorComponent() {
  const error = useRouteError();

  function getErrorMessage(err: unknown): string {
    // 1. Standard Error (npr. `throw new Error(...)` ili `fetch()` fail)
    if (err instanceof Error) return err.message;

    // 2. React Router Response error (npr. `throw new Response(...)`)
    if (
      typeof err === 'object' &&
      err !== null &&
      'data' in err &&
      typeof (err as any).data === 'string'
    ) {
      return (err as { data: string }).data;
    }

    // 3. Unknown fallback
    return 'Unknown error occurred.';
  }

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{getErrorMessage(error)}</p>

      <LinkButton to="-1">
        &larr; Go back
      </LinkButton>
    </div>
  );
}

export default ErrorComponent;
