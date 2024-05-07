import { useDispatch, useSelector } from "react-redux";
import { getProductsList, getProductsLoadingStatus, loadProductsList, productAddNewItem, productDeleted, productUpdated } from "../../../store/products";
import ListItems from "../../common/listItems/listItems";
import { useEffect, useState } from "react";
import Modal from "../../common/modal";
import FormCreator from "../../common/form/formCreator";
import productsService from "../../../services/products.service";
import { getCategoriesList, getCategoriesLoadingStatus, loadCategoriesList } from "../../../store/categories";

const formConfig = [
  {
    id: 0,
    label: "Название:",
    name: "name",
    value: "",
    placeholder: "Название..",
    type: "input-text",
    isRequired: true,
  },
  {
    id: 1,
    label: "Описание:",
    name: "description",
    value: "",
    placeholder: "Описание..",
    type: "input-text",
    isRequired: true,
  },
  {
    id: 2,
    label: "Категория:",
    name: "category",
    value: "",
    placeholder: "Категория..",
    type: "select",
    options: [],
    isRequired: true,
  },
  {
    id: 3,
    label: "Рейтинг:",
    name: "rage",
    value: "",
    placeholder: "Рейтинг..",
    type: "input-text",
    isRequired: true,
  },
  {
    id: 4,
    label: "Отзывы:",
    name: "reviews",
    value: "",
    placeholder: "Отзывы..",
    type: "input-text",
    isRequired: true,
  },
  {
    id: 5,
    label: "Цена:",
    name: "price",
    value: "",
    placeholder: "Цена..",
    type: "input-text",
    isRequired: true,
  },
  {
    id: 7,
    label: "Цена по акции:",
    name: "stokes",
    value: "",
    placeholder: "Цена по акции..",
    type: "input-text",
    isRequired: true,
  },
  {
    id: 8,
    label: "Бонус за покупку:",
    name: "bonus",
    value: "",
    placeholder: "Бонус за покупку..",
    type: "input-text",
    isRequired: true,
  },
  {
    id: 9,
    label: "Наличие:",
    name: "availability",
    value: "",
    placeholder: "Наличие..",
    type: "input-text",
    isRequired: true,
  },
  {
    id: 10,
    label: "Ссылку на картинку:",
    name: "image",
    value: "",
    placeholder: "Ссылку на картинку..",
    type: "input-text",
    isRequired: true,
  },
];

const AdminProductsPage = () => {
  const [isModalEditActive, setIsModalEditActive] = useState(false);
  const [formState, setFormState] = useState(formConfig);
  const [editMode, setEditMode] = useState(true);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [isLoadingRequest, setIsLoadingRequest] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProductsList());
    dispatch(loadCategoriesList());
  }, []);

  const products = useSelector(getProductsList());
  const isLoadingProduct = useSelector(getProductsLoadingStatus());

  const categories = useSelector(getCategoriesList());
  const isCategoriesLoading = useSelector(getCategoriesLoadingStatus());

  useEffect(() => {
    setFormState((prevState) => {
      return prevState.map((item) => {
        if (item.name === "category") {
          if (!isCategoriesLoading) {
            item.options = categories;
            return item;
          }
        }
        return item;
      });
    });
  }, [categories]);

  const resetFormValue = () => {
    setFormState((prevState) => {
      return prevState.map((item) => {
        item.value = "";
        return item;
      });
    });
  };

  const onClickEdit = (productId) => {
    setEditMode(true);
    setCurrentProductId(productId);
    const productItem = products.find((item) => item._id === productId);
    setIsModalEditActive(true);
    setFormState((prevState) => {
      return prevState.map((item) => {
        item.value = productItem[item.name];
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
      setIsLoadingRequest(true);
      e.preventDefault();
      const payload = formState.reduce((acc, input) => {
        acc[input.name] = input.value;
        return acc;
      }, {});

      if (editMode) {
        const data = await productsService.updateProduct(currentProductId, payload);
        dispatch(productUpdated(data));
      } else {
        const data = await productsService.addNewProduct(payload);
        dispatch(productAddNewItem(data));
      }

      setIsLoadingRequest(false);
      setIsModalEditActive(false);
    } catch (error) {}
  };

  const createProduct = () => {
    resetFormValue();
    setIsModalEditActive(true);
    setEditMode(false);
  };

  const onClickDelete = async (productId) => {
    try {
      if (window.confirm("Удалить товар?") == true) {
        setIsLoadingRequest(true);
        const data = await productsService.deleteProduct(productId);
        setIsLoadingRequest(false);
        dispatch(productDeleted(productId));
      }
    } catch (error) {}
  };

  return (
    <>
      <h1 className="admin-route-title">Все товары</h1>
      <div className="admin-main-content-list">
        {isLoadingProduct ? (
          "Загрузка..."
        ) : (
          <>
            <button className="admin-add-btn" onClick={createProduct} disabled={isLoadingRequest}>
              Добавить
            </button>
            <ListItems items={products} onClickEdit={onClickEdit} btnDisabled={isLoadingRequest} onClickDelete={onClickDelete} />
            <Modal isOpen={isModalEditActive} setIsOpen={setIsModalEditActive} title={editMode ? "Редактирование товара" : "Добавление товара"}>
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

export default AdminProductsPage;
