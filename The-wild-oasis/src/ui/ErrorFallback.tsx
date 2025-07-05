import styled from "styled-components";
import Button from "./Button";
import { useMoveBack } from "../hooks/useMoveBack";

const StyledErrorFallback = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 1.6rem;
  }

  & p {
    font-family: "Sono";
    margin-bottom: 3.2rem;
    color: var(--color-grey-500);
  }
`;

type ErrorFallbackProps = {
  message: string;
};

export default function ErrorFallback({ message }: ErrorFallbackProps) {
  const moveBack = useMoveBack();
  return (
    <StyledErrorFallback>
      <Box>
        <h1>An error occured</h1>
        <p>{message}</p>
        <Button onClick={moveBack} size="large" variation="primary">
          &larr; Back
        </Button>
      </Box>
    </StyledErrorFallback>
  );
}
