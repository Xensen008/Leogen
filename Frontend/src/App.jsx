import styled, { ThemeProvider } from "styled-components";
import { darkTheme } from "./utils/Theme";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <Wrapper>
          hello
        </Wrapper>
      </Container>
    </ThemeProvider>
  );
}

export default App;