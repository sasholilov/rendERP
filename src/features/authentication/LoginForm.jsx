import styled from "styled-components";
import GlobalStyles from "../../styles/GlobalStyles";
import loginBgImage from "../../data/images/login-bg.jpg";
import { StyledInput } from "../../ui/InputText";
import { StyledButton } from "../../ui/Button";

const LoginBg = styled.div`
  align-items: center;
  background-image: url(${loginBgImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100vh;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 500px;
  width: 100%;
  border-radius: 30px;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
  box-sizing: border-box;
  height: auto;
  padding: 20px;
  background-color: var(--color-light);
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -40%);

  & h2 {
    color: var(--color-blue-1);
    font-weight: 400;
    text-align: center;
  }
`;

const StyledInputText = styled(StyledInput)`
  max-width: 380px;
  width: 100%;
  position: relative;
  &:focus {
    background-color: var(--color-skyblue-1);
    color: var(--color-light);
    font-weight: 700;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const InputPassword = styled.input.attrs({ type: "password" })`
  border: 1px solid #688cb4 !important;
  padding: 8px !important;
  max-width: 380px;
  width: 100%;
  border-radius: 10px;
  color: #495057;
  font-size: 1rem !important;
  cursor: text !important;
  &:focus {
    background-color: var(--color-skyblue-1);
    color: var(--color-light);
    font-weight: 700;
  }
`;

const LoginButton = styled(StyledButton)`
  margin-top: 30px;
  margin-bottom: 20px;
  max-width: 150px;
  width: 100%;
  align-self: center;
`;

function LoginForm() {
  return (
    <>
      <GlobalStyles />
      <LoginBg>
        <LoginContainer>
          <h2>Sign In To rendERP</h2>
          <Form>
            <StyledInputText placeholder="E-mail" />
            <InputPassword placeholder="Password" />
          </Form>
          <LoginButton type="add">Sing In</LoginButton>
        </LoginContainer>
      </LoginBg>
    </>
  );
}

export default LoginForm;
