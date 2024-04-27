import { useEffect, useState } from "react";
import FormCreator from "../common/form/formCreator";
import { useDispatch, useSelector } from "react-redux";
import { getAuthError, getIsAuthLoading, getSuccessRegister, register } from "../../store/auth";

const formConfig = [
  { id: 0, label: "E-mail", name: "email", value: "", placeholder: "ivan.ivanov@mail.ru", type: "text", isRequired: true },
  { id: 1, label: "Пароль", name: "password", value: "", placeholder: "12345678", type: "text", isRequired: true },
  { id: 2, label: "Повторите пароль:", name: "confirmPassword", value: "", placeholder: "12345678", type: "text", isRequired: true },
  { id: 3, label: "Имя", name: "name", value: "", placeholder: "12345678", type: "text", isRequired: true },
  { id: 4, label: "Телефон", name: "phone", value: "", placeholder: "+8 (913) 888 88 88", type: "text", isRequired: true },
];

const RegisterForm = ({ handleClickChangeLoginState, loginFormState }) => {
  const error = useSelector(getAuthError());

  const isSuccessRegister = useSelector(getSuccessRegister());

  const [formState, setFormState] = useState(formConfig);

  const isBtnDisabled = useSelector(getIsAuthLoading());

  const dispatch = useDispatch();

  useEffect(() => {
    resetFormValue();
  }, [loginFormState]);

  const resetFormValue = () => {
    setFormState((prevState) => {
      return prevState.map((item) => {
        item.value = "";
        return item;
      });
    });
  };

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

  const submitForm = async (e) => {
    e.preventDefault();
    const data = formState.reduce((acc, input) => {
      if (input.name !== "confirmPassword") {
        acc[input.name] = input.value;
      }
      return acc;
    }, {});

    dispatch(register(data));
  };

  return (
    <>
      {isSuccessRegister ? (
        <>
          <p className="form-text">
            Пользователь успешно зарегистрирован <br />
            <span className="login-form-href" onClick={() => handleClickChangeLoginState(true)}>
              Войти
            </span>
          </p>
        </>
      ) : (
        <>
          <FormCreator
            formState={formState}
            handleChange={handleChange}
            submitForm={submitForm}
            btnText="Регистрация"
            btnDisabled={isBtnDisabled}
            error={error}
          />
          <p className="form-text">
            Уже есть аккаунт? <span onClick={() => handleClickChangeLoginState(true)}>Войти</span>
          </p>
        </>
      )}
    </>
  );
};

export default RegisterForm;
