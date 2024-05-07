import { useEffect, useState } from "react";
import FormCreator from "../common/form/formCreator";
import feedbackService from "../../services/feedback.service";

const formConfig = [
  {
    id: 0,
    label: "Ваш e-mail:",
    name: "email",
    value: "",
    placeholder: "ivan.ivanov@mail.ru",
    type: "input-text",
    isRequired: true,
  },
  {
    id: 1,
    label: "Ваше имя:",
    name: "name",
    value: "",
    placeholder: "Иван",
    type: "input-text",
    isRequired: true,
  },
  {
    id: 2,
    label: "Ваше сообщение или вопрос:",
    name: "messageText",
    value: "",
    placeholder: "Сообщение или вопрос...",
    type: "textarea",
    isRequired: true,
  },
];

const FeedbackPage = () => {
  const [formState, setFormState] = useState(formConfig);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
    setIsSuccess(false);
  }, []);

  const submitForm = async (e) => {
    try {
      e.preventDefault();
      const payload = formState.reduce((acc, input) => {
        acc[input.name] = input.value;
        return acc;
      }, {});

      setIsLoading(true);
      const data = await feedbackService.post(payload);
      if (data.status === "SUCCESS") {
        setIsLoading(false);
        setIsSuccess(true);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="feedback-title">Форма обратной связи</h1>
      <div className="feedback-wrapper">
        {isSuccess ? (
          <p className="feedback-success-message">
            Ваше сообщение успешно отправлено! Ожидайте ответа на электронную почту: <strong>{formState[0].value}</strong>
          </p>
        ) : (
          <FormCreator formState={formState} handleChange={handleChange} submitForm={submitForm} btnText="Отправить" btnDisabled={isLoading} error={null} />
        )}
      </div>
    </>
  );
};

export default FeedbackPage;
