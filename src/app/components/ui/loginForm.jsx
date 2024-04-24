import { useState } from "react";
import FormCreator from "../common/form/formCreator";

const formConfig = [
  { id: 0, label: "E-mail", name: "email", value: "", placeholder: "ivan.ivanov@mail.ru", type: "text", isRequired: true },
  { id: 1, label: "Пароль", name: "password", value: "", placeholder: "12345678", type: "text", isRequired: true },
];

const LoginForm = () => {
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

// const LoginForm = () => {
//   return (
//     <form className="form-content">
//       <div className="form-input-item">
//         <label htmlFor="email" className="form-input-label">
//           E-mail:
//         </label>
//         <input type="text" className="form-input-text" placeholder="ivan.ivanov@mail.ru" name="email" id="email" />
//       </div>
//       <div className="form-input-item">
//         <label htmlFor="password" className="form-input-label">
//           Пароль:
//         </label>
//         <input type="text" className="form-input-text" placeholder="12345678" name="password" id="password" />
//       </div>
//       <button type="submit" className="form-input-btn">
//         Войти
//       </button>
//     </form>
//   );
// };

/*

formConfig:

[
  {id: 0, label: 'E-mail', name: 'email', value: '', placeholder: 'ivan.ivanov@mail.ru', type: 'text', isRequired: true}
]

*/

export default LoginForm;
