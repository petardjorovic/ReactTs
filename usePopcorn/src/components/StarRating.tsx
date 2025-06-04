import { useState } from "react";
import Star from "./Star";

type StarRatingProps = {
  maxRating: number;
  color?: string;
  size?: number;
  className?: string;
  messages?: string[];
  defaultRating?: number;
  onSetRating?: React.Dispatch<React.SetStateAction<number>>;
};

const containerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle: React.CSSProperties = {
  display: "flex",
};

export default function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  className = "",
  messages = [],
  defaultRating = 0,
  onSetRating,
}: StarRatingProps) {
  const [rating, setRatting] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(rating: number) {
    setRatting(rating);
    if (onSetRating) {
      onSetRating(rating);
    }
  }

  function handleTempRating(rating: number) {
    setTempRating(rating);
  }

  const textStyle: React.CSSProperties = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };
  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRate={() => handleRating(i + 1)}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onHoverIn={() => handleTempRating(i + 1)}
            onHoverOut={() => handleTempRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>
        {messages?.length === maxRating
          ? messages?.[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
}
