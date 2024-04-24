import { useState } from "react";
import FormCreator from "../common/form/formCreator";

const formConfig = [
  { id: 0, label: "E-mail", name: "email", value: "", placeholder: "ivan.ivanov@mail.ru", type: "text", isRequired: true },
  { id: 1, label: "Пароль", name: "password", value: "", placeholder: "12345678", type: "text", isRequired: true },
  { id: 2, label: "Повторите пароль:", name: "confirmPassword", value: "", placeholder: "12345678", type: "text", isRequired: true },
  { id: 3, label: "Имя", name: "name", value: "", placeholder: "12345678", type: "text", isRequired: true },
  { id: 4, label: "Телефон", name: "phone", value: "", placeholder: "+8 (913) 888 88 88", type: "text", isRequired: true },
];

const RegisterForm = () => {
  const [formState, setFormState] = useState(formConfig);

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

  const submitForm = (e) => {
    e.preventDefault();
    const data = formState.reduce((acc, input) => {
      acc[input.name] = input.value;
      return acc;
    }, {});
    console.log("submit", data);
  };

  return <FormCreator formState={formState} handleChange={handleChange} submitForm={submitForm} />;
};

export default RegisterForm;
