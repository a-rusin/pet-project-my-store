import { useEffect, useState } from "react";
import FormCreator from "../common/form/formCreator";
import { useDispatch, useSelector } from "react-redux";
import { authSetUserSuccess, getCurrentUser } from "../../store/auth";
import authService from "../../services/auth.service";

const formConfig = [
  {
    id: 0,
    label: "E-mail: ",
    name: "email",
    value: "",
    placeholder: "ivan.ivanov@mail.ru",
    type: "input-text",
    isRequired: true,
  },
  {
    id: 1,
    label: "Имя:",
    name: "name",
    value: "",
    placeholder: "Иван",
    type: "input-text",
    isRequired: true,
  },
  {
    id: 2,
    label: "Мобильный номер:",
    name: "phone",
    value: "",
    placeholder: "8 (913) 123 45 67",
    type: "input-text",
    isRequired: true,
  },
  {
    id: 3,
    label: "Никнейм:",
    name: "nickname",
    value: "",
    placeholder: "user-name-2024",
    type: "input-text",
    isRequired: true,
  },
  {
    id: 4,
    label: "Дата рождения:",
    name: "dayBirth",
    value: "",
    placeholder: "19.03.1970",
    type: "date",
    isRequired: true,
  },
];

const ProfilePage = () => {
  const [formState, setFormState] = useState(formConfig);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const currentUser = useSelector(getCurrentUser());

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

  const setFormData = (data) => {
    setFormState((prevState) => {
      return prevState.map((item) => {
        if (data[item.name]) {
          item.value = data[item.name];
        }
        return item;
      });
    });
  };

  useEffect(() => {
    resetFormValue();
    if (currentUser) {
      setFormData(currentUser);
    }
  }, []);

  const submitForm = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const formData = formState.reduce((acc, input) => {
        if (input.value.trim().length !== 0) {
          acc[input.name] = input.value;
        }
        return acc;
      }, {});
      const payload = {
        userId: currentUser._id,
        ...formData,
      };
      const data = await authService.update(payload);
      dispatch(authSetUserSuccess(data));
      setFormData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return <FormCreator formState={formState} handleChange={handleChange} submitForm={submitForm} btnText="Сохранить" btnDisabled={isLoading} error={null} />;
};

export default ProfilePage;
