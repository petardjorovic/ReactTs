import styled from "styled-components";

type StyledSelectProps = {
  type?: string;
};

const StyledSelect = styled.select<StyledSelectProps>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

type SelectProps = {
  value?: string;
  options: { value: string; label: string }[];
  type: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function Select({
  value,
  options,
  type,
  onChange,
}: SelectProps) {
  return (
    <StyledSelect value={value} type={type} onChange={onChange}>
      {options.map((option) => {
        return (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        );
      })}
    </StyledSelect>
  );
}
