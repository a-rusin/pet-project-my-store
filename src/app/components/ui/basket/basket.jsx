import { useDispatch, useSelector } from "react-redux";
import { closeBasket, getBasketEntities, getBasketStatus } from "../../../store/basket";
import BasketList from "./basketList";
import { getProductsLoadingStatus } from "../../../store/products";
import Loader from "../../common/loader";

const Basket = () => {
  const isBasketOpen = useSelector(getBasketStatus());
  const isProductsLoading = useSelector(getProductsLoadingStatus());

  const dispatch = useDispatch();

  const handleClickParanja = () => {
    document.body.classList.remove("blocked");
    dispatch(closeBasket());
  };

  return (
    <div className={isBasketOpen ? "basket" : "basket hide"}>
      <div className="basket-paranja" onClick={handleClickParanja}></div>
      <div className="basket-wrapper">
        <div className="basket-top-group">
          <h3 className="basket-title">Корзина</h3>
          {isProductsLoading ? <Loader /> : <BasketList />}
        </div>
        <div className="basket-bottom-group">
          <div className="basket-total-price">
            <strong>Итого</strong>: 45 000 ₽
          </div>
          <div className="bakset-btn-group">
            <button className="basket-btn basket-btn-buy">Заказать</button>
            <button className="basket-btn basket-btn-clear">Очистить</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basket;
