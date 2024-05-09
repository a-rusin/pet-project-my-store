import { useEffect, useState } from "react";
import ListItems from "../../common/listItems/listItems";
import Modal from "../../common/modal";
import FormCreator from "../../common/form/formCreator";
import newsService from "../../../services/news.service";

const formConfig = [
  {
    id: 0,
    label: "Заголовок новости:",
    name: "name",
    value: "",
    placeholder: "Заголовок новости..",
    type: "input-text",
    isRequired: true,
  },
  {
    id: 1,
    label: "Текст новости:",
    name: "fullText",
    value: "",
    placeholder: "Текст новости...",
    type: "textarea",
    isRequired: true,
  },
];

const AdminNewsPage = () => {
  const [formState, setFormState] = useState(formConfig);

  const [isNewsLoading, setIsNewsLoading] = useState(true);
  const [isLoadingRequest, setIsLoadingRequest] = useState(false);
  const [news, setNews] = useState([]);
  const [editMode, setEditMode] = useState(true);
  const [isModalEditActive, setIsModalEditActive] = useState(false);
  const [currentNewsItemId, setCurrentNewsItemId] = useState(null);

  const createNews = () => {
    resetFormValue();
    setIsModalEditActive(true);
    setEditMode(false);
  };

  const onClickEdit = (itemId) => {
    setEditMode(true);
    setCurrentNewsItemId(itemId);
    const currentItem = news.find((item) => item._id === itemId);
    setIsModalEditActive(true);
    setFormState((prevState) => {
      return prevState.map((item) => {
        item.value = currentItem[item.name];
        return item;
      });
    });
  };

  const onClickDelete = async (itemId) => {
    try {
      if (window.confirm("Удалить новость?") == true) {
        setIsLoadingRequest(true);
        const data = await newsService.delete(itemId);
        setNews((prevState) => prevState.filter((item) => item._id !== data._id));
        setIsLoadingRequest(false);
      }
    } catch (error) {
      setIsLoadingRequest(false);
    }
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
    try {
      setIsLoadingRequest(true);
      e.preventDefault();
      const payload = formState.reduce((acc, input) => {
        acc[input.name] = input.value;
        return acc;
      }, {});

      if (editMode) {
        const data = await newsService.update(currentNewsItemId, payload);
        setNews((prevState) =>
          prevState.map((item) => {
            if (item._id === data._id) {
              return data;
            }
            return item;
          })
        );
      } else {
        const data = await newsService.post(payload);
        setNews((prev) => [...prev, data]);
      }

      setIsLoadingRequest(false);
      setIsModalEditActive(false);
    } catch (error) {
      setIsLoadingRequest(false);
    }
  };

  const resetFormValue = () => {
    setFormState((prevState) => {
      return prevState.map((item) => {
        item.value = "";
        return item;
      });
    });
  };

  const getAllNews = async () => {
    try {
      setIsNewsLoading(true);
      const data = await newsService.getAll();
      setNews(data);
      setIsNewsLoading(false);
    } catch (error) {
      setIsNewsLoading(false);
    }
  };

  useEffect(() => {
    resetFormValue();
    getAllNews();
  }, []);

  return (
    <>
      <h1 className="admin-route-title">Новости</h1>
      <div className="admin-main-content-list">
        {isNewsLoading ? (
          "Загрузка..."
        ) : (
          <>
            <button className="admin-add-btn" onClick={createNews} disabled={isLoadingRequest}>
              Добавить
            </button>
            <ListItems items={news} onClickEdit={onClickEdit} onClickDelete={onClickDelete} btnDisabled={isLoadingRequest} />
            <Modal isOpen={isModalEditActive} setIsOpen={setIsModalEditActive} title={editMode ? "Редактирование новости" : "Добавление новости"}>
              <FormCreator
                formState={formState}
                handleChange={handleChange}
                submitForm={submitForm}
                btnText={editMode ? "Обновить" : "Добавить"}
                btnDisabled={isLoadingRequest}
                error={null}
              />
            </Modal>
          </>
        )}
      </div>
    </>
  );
};

export default AdminNewsPage;
