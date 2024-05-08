import { useEffect, useState } from "react";
import FormCreator from "../common/form/formCreator";
import BasketList from "../ui/basket/basketList";
import { useDispatch, useSelector } from "react-redux";
import { clearBasket, getBasketEntities } from "../../store/basket";
import formatNumber from "../../utils/formatNumber";
import productsService from "../../services/products.service";
import ordersService from "../../services/orders.service";
import { getCurrentUser, getIsAuthLoading } from "../../store/auth";
import Loader from "../common/loader";

const formConfig = [
  {
    id: 0,
    label: "ФИО:",
    name: "name",
    value: "",
    placeholder: "Иванов Иван Иванович",
    type: "input-text",
    isRequired: true,
  },
  {
    id: 1,
    label: "E-mail:",
    name: "email",
    value: "",
    placeholder: "ivan.ivanov@mail.ru",
    type: "input-text",
    isRequired: true,
  },
  {
    id: 2,
    label: "Мобильный номер: ",
    name: "phone",
    value: "",
    placeholder: "+7 (913) 444 55 66",
    type: "input-text",
    isRequired: true,
  },
  {
    id: 3,
    label: "Полный адрес проживания: ",
    name: "location",
    value: "",
    placeholder: "Россия, г. Москва, ул. Ленина д. 22/2 кв. 544",
    type: "input-text",
    isRequired: true,
  },
];

const OrderPage = () => {
  const [formState, setFormState] = useState(formConfig);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const currentUser = useSelector(getCurrentUser());
  const isAuthLoading = useSelector(getIsAuthLoading());

  const dispatch = useDispatch();

  const basketEntities = useSelector(getBasketEntities());

  const totalPrice = basketEntities.reduce((acc, item) => item.productInfo.price * item.count + acc, 0);

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
  }, []);

  const submitForm = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const products = basketEntities.map((item) => ({ productId: item.productId, count: item.count }));
      let formData = formState.reduce((acc, input) => {
        acc[input.name] = input.value;
        return acc;
      }, {});
      const payload = {
        ...formData,
        products,
        totalPrice,
        authorId: currentUser ? currentUser._id : null,
      };
      const data = await ordersService.add(payload);
      if (data.status === "SUCCESS") {
        setIsLoading(false);
        setIsSuccess(true);
        dispatch(clearBasket());
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className="order">
      <h1 className="order-title">Оформление заказа</h1>
      {isSuccess ? (
        <div className="order-wrapper">Ваш заказ успешно получен. В ближайшее время с вами свяжутся наши менеджера.</div>
      ) : (
        <>
          {isAuthLoading ? (
            <div className="order-wrapper">
              <Loader />
            </div>
          ) : (
            <>
              <div className="order-wrapper">
                <h2 className="order-label">1. Контакты получателя: </h2>

                <FormCreator
                  formState={formState}
                  handleChange={handleChange}
                  submitForm={null}
                  btnText="Войти"
                  btnDisabled={false}
                  error={null}
                  isSubmitBtnEnabled={false}
                />
              </div>
              <div className="order-wrapper">
                <h2 className="order-label">2. Список товаров: </h2>
                <BasketList order={true} />
                <p className="order-total-price">
                  <strong>Итого: </strong>
                  {formatNumber(totalPrice.toString())} ₽
                </p>
              </div>
              <button className="order-btn-confirm" onClick={submitForm} disabled={isLoading}>
                Подтвердить заказ
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default OrderPage;
