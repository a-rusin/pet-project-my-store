import { useDispatch, useSelector } from "react-redux";
import {
  getProductsList,
  getProductsLoadingStatus,
  loadProductsList,
} from "../../../store/products";
import ListItems from "../../common/listItems/listItems";
import { useEffect, useState } from "react";
import Modal from "../../common/modal";
import FormCreator from "../../common/form/formCreator";

const formConfig = [
  {
    id: 0,
    label: "Название:",
    name: "name",
    value: "",
    placeholder: "Название..",
    type: "text",
    isRequired: true,
  },
  {
    id: 1,
    label: "Описание:",
    name: "description",
    value: "",
    placeholder: "Описание..",
    type: "text",
    isRequired: true,
  },
  {
    id: 2,
    label: "Категория:",
    name: "category",
    value: "",
    placeholder: "Категория..",
    type: "text",
    isRequired: true,
  },
  {
    id: 3,
    label: "Рейтинг:",
    name: "rage",
    value: "",
    placeholder: "Рейтинг..",
    type: "text",
    isRequired: true,
  },
  {
    id: 4,
    label: "Отзывы:",
    name: "reviews",
    value: "",
    placeholder: "Отзывы..",
    type: "text",
    isRequired: true,
  },
  {
    id: 5,
    label: "Цена:",
    name: "price",
    value: "",
    placeholder: "Цена..",
    type: "text",
    isRequired: true,
  },
  {
    id: 6,
    label: "Цена:",
    name: "price",
    value: "",
    placeholder: "Цена..",
    type: "text",
    isRequired: true,
  },
  {
    id: 7,
    label: "Цена по акции:",
    name: "stokes",
    value: "",
    placeholder: "Цена по акции..",
    type: "text",
    isRequired: true,
  },
  {
    id: 8,
    label: "Бонус за покупку:",
    name: "bonus",
    value: "",
    placeholder: "Бонус за покупку..",
    type: "text",
    isRequired: true,
  },
  {
    id: 9,
    label: "Наличие:",
    name: "availability",
    value: "",
    placeholder: "Наличие..",
    type: "text",
    isRequired: true,
  },
  {
    id: 10,
    label: "Ссылку на картинку:",
    name: "image",
    value: "",
    placeholder: "Ссылку на картинку..",
    type: "text",
    isRequired: true,
  },
];

const AdminProductsPage = () => {
  const [isModalEditActive, setIsModalEditActive] = useState(false);
  const [formState, setFormState] = useState(formConfig);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProductsList());
  }, []);

  const products = useSelector(getProductsList());
  const isLoading = useSelector(getProductsLoadingStatus());

  const onClickEdit = (productId) => {
    console.log(productId);
    const productItem = products.find((item) => item._id === productId);
    setIsModalEditActive(true);
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

  const submitForm = async (e) => {};

  return (
    <>
      <h1 className="admin-route-title">Все товары</h1>
      <div className="admin-main-content-list">
        {isLoading ? (
          "Загрузка..."
        ) : (
          <>
            <ListItems items={products} onClickEdit={onClickEdit} />
            <Modal
              isOpen={isModalEditActive}
              setIsOpen={setIsModalEditActive}
              title="Редактирование товара"
            >
              <FormCreator
                formState={formState}
                handleChange={handleChange}
                submitForm={submitForm}
                btnText="Обновить"
                btnDisabled={false}
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
