import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { Navigate } from "react-router-dom";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  // 1.Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();
  // const navigate = useNavigate();

  // 2. if there is NO authenticated user, redirect to login page
  // useEffect(
  //   function () {
  //     if (!isAuthenticated && !isLoading) navigate("/login");
  //   },
  //   [isAuthenticated, navigate, isLoading]
  // );

  // 2. While loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 3. if there is NO authenticated user, redirect to login page //* BOLJA verzija
  if (!isAuthenticated) return <Navigate to={"/login"} replace={true} />;

  // 4. if there IS a user, render the app
  if (isAuthenticated) return children;
}
