import { useEffect, useState } from "react";
import FormCreator from "../common/form/formCreator";
import { useDispatch, useSelector } from "react-redux";
import { getAuthError, getIsAuthLoading, login } from "../../store/auth";

const formConfig = [
  {
    id: 0,
    label: "E-mail",
    name: "email",
    value: "",
    placeholder: "ivan.ivanov@mail.ru",
    type: "text",
    isRequired: true,
  },
  {
    id: 1,
    label: "Пароль",
    name: "password",
    value: "",
    placeholder: "12345678",
    type: "text",
    isRequired: true,
  },
];

const LoginForm = ({ handleClickChangeLoginState, loginFormState }) => {
  const [formState, setFormState] = useState(formConfig);

  const dispatch = useDispatch();

  const isBtnDisabled = useSelector(getIsAuthLoading());

  const errors = useSelector(getAuthError());

  const handleChange = (name, value) => {
    setFormState((prevState) => {
      return prevState.map((item) => {
        if (item.name === name) {
          item.value = value;
        }
        return item;
      });
    });
  };

  const resetFormValue = () => {
    setFormState((prevState) => {
      return prevState.map((item) => {
        item.value = "";
        return item;
      });
    });
  };

  useEffect(() => {
    resetFormValue();
  }, [loginFormState]);

  const submitForm = (e) => {
    e.preventDefault();
    const data = formState.reduce((acc, input) => {
      acc[input.name] = input.value;
      return acc;
    }, {});
    dispatch(login(data));
  };

  return (
    <>
      <FormCreator
        formState={formState}
        handleChange={handleChange}
        submitForm={submitForm}
        btnText="Войти"
        btnDisabled={isBtnDisabled}
        error={errors}
      />
      <p className="form-text">
        Нету аккаунта?{" "}
        <span onClick={() => handleClickChangeLoginState(false)}>
          Регистрация
        </span>
      </p>
    </>
  );
};

export default LoginForm;
