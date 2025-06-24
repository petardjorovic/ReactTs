import { useSelector } from 'react-redux';
import type { RootStore } from '../../store';

export default function Username() {
  const { username } = useSelector(
    (state: RootStore) => state.userStore
  );

  if (!username) return null;
  return (
    <div className="hidden text-sm font-semibold md:block">
      {username}
    </div>
  );
}
