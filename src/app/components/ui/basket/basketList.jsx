import { useSelector } from "react-redux";
import BasketListItem from "./basketListItem";
import { getBasketEntities, getBasketLoadingStatus } from "../../../store/basket";
import Loader from "../../common/loader";

const BasketList = ({ order }) => {
  const basketEntities = useSelector(getBasketEntities());
  const isLoadingBasket = useSelector(getBasketLoadingStatus());

  return (
    <ul className="basket-list" style={{ height: order ? "auto" : null }}>
      {isLoadingBasket ? (
        <Loader />
      ) : (
        <>{basketEntities.length === 0 ? "Корзина пуста" : basketEntities.map((product) => <BasketListItem key={product.productId} product={product} />)}</>
      )}
    </ul>
  );
};

export default BasketList;
