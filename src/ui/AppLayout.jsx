import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";
import GlobalStyles from "../styles/GlobalStyles";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 13rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
  font-family: "IBM Plex Sans", sans-serif;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`;

const Main = styled.main`
  background-color: var(--color-grey-2);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`;
function AppLayout() {
  return (
    <>
      <GlobalStyles />
      <StyledAppLayout>
        <Header />
        <Sidebar />
        <Main>
          <Container>
            <Outlet />
          </Container>
        </Main>
      </StyledAppLayout>
    </>
  );
}

export default AppLayout;
