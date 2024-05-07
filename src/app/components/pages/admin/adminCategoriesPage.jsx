import { useDispatch, useSelector } from "react-redux";
import ListItems from "../../common/listItems/listItems";
import {
  addNewCategory,
  categoriesAddNewItem,
  categoriesDeleted,
  categoriesUpdated,
  getCategoriesList,
  getCategoriesLoadingStatus,
  loadCategoriesList,
} from "../../../store/categories";
import { useEffect, useState } from "react";
import Modal from "../../common/modal";
import FormCreator from "../../common/form/formCreator";
import categoriesService from "../../../services/categories.service";

const formConfig = [
  {
    id: 0,
    label: "Название категории:",
    name: "name",
    value: "",
    placeholder: "Название категории..",
    type: "input-text",
    isRequired: true,
  },
  {
    id: 1,
    label: "Путь (URL):",
    name: "path",
    value: "",
    placeholder: "Путь (URL):",
    type: "input-text",
    isRequired: true,
  },
];

const AdminCategoriesPage = () => {
  const [formState, setFormState] = useState(formConfig);
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(true);
  const [isModalEditActive, setIsModalEditActive] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);

  const categories = useSelector(getCategoriesList());
  const isCategoriesLoading = useSelector(getCategoriesLoadingStatus());

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCategoriesList());
  }, []);

  const onClickEdit = (categoryId) => {
    setEditMode(true);
    setCurrentCategoryId(categoryId);
    const categoryItem = categories.find((item) => item._id === categoryId);
    setIsModalEditActive(true);
    setFormState((prevState) => {
      return prevState.map((item) => {
        item.value = categoryItem[item.name];
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
    try {
      setIsLoading(true);
      e.preventDefault();
      const payload = formState.reduce((acc, input) => {
        acc[input.name] = input.value;
        return acc;
      }, {});

      if (editMode) {
        const data = await categoriesService.update(currentCategoryId, payload);
        dispatch(categoriesUpdated(data));
      } else {
        const data = await categoriesService.post(payload);
        dispatch(categoriesAddNewItem(data));
      }

      setIsLoading(false);
      setIsModalEditActive(false);
    } catch (error) {}
  };

  const resetFormValue = () => {
    setFormState((prevState) => {
      return prevState.map((item) => {
        item.value = "";
        return item;
      });
    });
  };

  const createCategory = () => {
    resetFormValue();
    setIsModalEditActive(true);
    setEditMode(false);
  };

  const onClickDelete = async (categoryId) => {
    try {
      if (window.confirm("Удалить категорию?") == true) {
        setIsLoading(true);
        const data = await categoriesService.delete(categoryId);
        setIsLoading(false);
        dispatch(categoriesDeleted(categoryId));
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="admin-route-title">Категории</h1>
      <div className="admin-main-content-list">
        {isCategoriesLoading ? (
          "Загрузка..."
        ) : (
          <>
            <button className="admin-add-btn" onClick={createCategory} disabled={isLoading}>
              Добавить
            </button>
            <ListItems items={categories} onClickEdit={onClickEdit} onClickDelete={onClickDelete} btnDisabled={isLoading} />
            <Modal isOpen={isModalEditActive} setIsOpen={setIsModalEditActive} title={editMode ? "Редактирование категории" : "Добавление категории"}>
              <FormCreator
                formState={formState}
                handleChange={handleChange}
                submitForm={submitForm}
                btnText={editMode ? "Обновить" : "Добавить"}
                btnDisabled={isLoading}
                error={null}
              />
            </Modal>
          </>
        )}
      </div>
    </>
  );
};

export default AdminCategoriesPage;
