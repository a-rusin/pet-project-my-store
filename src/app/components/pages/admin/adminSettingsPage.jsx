import { useEffect, useState } from "react";
import FormCreator from "../../common/form/formCreator";
import Modal from "../../common/modal";
import settingsService from "../../../services/settings.service";
import ContactsContainer from "../../common/contactsContainer";

const formConfig = [
  {
    id: 0,
    label: "Адрес магазина: ",
    name: "location",
    value: "",
    placeholder: "Россия, г. Томск, ул. Усова д. 37, 1 этаж, офис 345",
    type: "input-text",
    isRequired: true,
  },
  {
    id: 1,
    label: "Номер телефона: ",
    name: "phone",
    value: "",
    placeholder: "8 (913) 804-87-87",
    type: "input-text",
    isRequired: true,
  },
  {
    id: 2,
    label: "Email: ",
    name: "email",
    value: "",
    placeholder: "store@store.com",
    type: "input-text",
    isRequired: true,
  },
];

const AdminPageSettings = () => {
  const [formState, setFormState] = useState(formConfig);
  const [isModalEditActive, setIsModalEditActive] = useState(false);
  const [currntSettings, setCurrentSettings] = useState(null);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [isLoadingRequest, setIsLoadingRequest] = useState(false);

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

  const getSettings = async () => {
    try {
      setIsLoadingPage(true);
      const data = await settingsService.get();
      setCurrentSettings(data[0]);
      setIsLoadingPage(false);
    } catch (error) {
      setIsLoadingPage(false);
    }
  };

  useEffect(() => {
    resetFormValue();
    getSettings();
  }, []);

  const submitForm = async (e) => {
    try {
      e.preventDefault();
      setIsLoadingRequest(true);
      const payload = formState.reduce((acc, input) => {
        acc[input.name] = input.value;
        return acc;
      }, {});
      const data = await settingsService.post(payload);
      setCurrentSettings(data);
      setIsLoadingRequest(false);
      setIsModalEditActive(false);
    } catch (error) {
      setIsLoadingRequest(false);
    }
  };

  const handleClick = () => {
    setIsModalEditActive(true);
    if (currntSettings) {
      setFormState((prevState) => {
        return prevState.map((item) => {
          item.value = currntSettings[item.name];
          return item;
        });
      });
    }
  };

  return (
    <>
      <h1 className="admin-route-title">Общие настройки</h1>
      <div className="admin-main-content-list">
        {isLoadingPage ? (
          "Загрузка..."
        ) : (
          <>
            <ContactsContainer data={currntSettings} />
            <button className="admin-add-btn" onClick={handleClick}>
              Редактировать
            </button>
            <Modal isOpen={isModalEditActive} setIsOpen={setIsModalEditActive} title="Редактирование адреса">
              <FormCreator
                formState={formState}
                handleChange={handleChange}
                submitForm={submitForm}
                btnText="Сохранить"
                btnDisabled={isLoadingRequest}
                error={false}
              />
            </Modal>
          </>
        )}
      </div>
    </>
  );
};

export default AdminPageSettings;

const data = { location: "Russia", phone: "", phone: "111" };
