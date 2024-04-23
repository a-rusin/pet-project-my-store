import { useSelector } from "react-redux";
import BasketListItem from "./basketListItem";
import { getBasketEntities } from "../../../store/basket";

const BasketList = () => {
  const basketEntities = useSelector(getBasketEntities());

  return (
    <ul className="basket-list">
      {basketEntities.map((product) => (
        <BasketListItem key={product._id} product={product} />
      ))}
    </ul>
  );
};

export default BasketList;
