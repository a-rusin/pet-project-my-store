import { useState } from "react";
import LoginForm from "../ui/loginForm";
import RegisterForm from "../ui/registerForm";
import { useDispatch } from "react-redux";
import { resetAuthError, resetRegisterStatus } from "../../store/auth";

const LoginPage = () => {
  const [loginForm, setLoginForm] = useState(true);

  const dispatch = useDispatch();

  const handleClickChangeLoginState = (boolean) => {
    setLoginForm(boolean);
    dispatch(resetAuthError());
    dispatch(resetRegisterStatus());
  };

  return (
    <div className="form">
      <div className="form-wrapper">
        <h1 className="form-title">{loginForm ? "Авторизация" : "Регистрация"}</h1>
        {loginForm ? (
          <LoginForm handleClickChangeLoginState={handleClickChangeLoginState} loginFormState={loginForm} />
        ) : (
          <RegisterForm handleClickChangeLoginState={handleClickChangeLoginState} loginFormState={loginForm} />
        )}
      </div>
    </div>
  );
};

export default LoginPage;
