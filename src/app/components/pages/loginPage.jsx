import { useState } from "react";
import LoginForm from "../ui/loginForm";
import RegisterForm from "../ui/registerForm";

const LoginPage = () => {
  const [loginForm, setLoginForm] = useState(true);

  return (
    <div className="form">
      <div className="form-wrapper">
        <h1 className="form-title">{loginForm ? "Авторизация" : "Регистрация"}</h1>
        {loginForm ? <LoginForm /> : <RegisterForm />}
        <p className="form-text">
          {loginForm ? (
            <>
              Нету аккаунта? <span onClick={() => setLoginForm(false)}>Регистрация</span>
            </>
          ) : (
            <>
              Уже есть аккаунт? <span onClick={() => setLoginForm(true)}>Войти</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
