import { useDispatch, useSelector } from "react-redux";
import { closeBasket, getBasketStatus } from "../../store/basket";

const Basket = () => {
  const isBasketOpen = useSelector(getBasketStatus());
  const dispatch = useDispatch();

  const handleClickParanja = () => {
    dispatch(closeBasket());
  };

  return (
    <div className={isBasketOpen ? "basket" : "basket hide"}>
      <div className="basket-paranja" onClick={handleClickParanja}></div>
      <div className="basket-wrapper">Basket!</div>
    </div>
  );
};

export default Basket;
