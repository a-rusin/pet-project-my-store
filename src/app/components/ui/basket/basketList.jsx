import { useSelector } from "react-redux";
import BasketListItem from "./basketListItem";
import { getBasketEntities } from "../../../store/basket";

const BasketList = () => {
  const basketEntities = useSelector(getBasketEntities());

  return (
    <ul className="basket-list">
      {basketEntities.length === 0 ? "Корзина пуста" : basketEntities.map((product) => <BasketListItem key={product.productId} product={product} />)}
      {}
    </ul>
  );
};

export default BasketList;
