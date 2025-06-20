import { memo, type SetStateAction } from "react";

type ToggleSoundsProps = {
  allowSound: boolean;
  setAllowSound: React.Dispatch<SetStateAction<boolean>>;
};

function ToggleSounds({ allowSound, setAllowSound }: ToggleSoundsProps) {
  return (
    <button
      className="btn-sound"
      onClick={() => setAllowSound((allow) => !allow)}
    >
      {allowSound ? "🔈" : "🔇"}
    </button>
  );
}

export default memo(ToggleSounds);
