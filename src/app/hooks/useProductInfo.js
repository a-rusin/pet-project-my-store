import { useDispatch, useSelector } from "react-redux";
import { addProductToBasket, getBasketEntities } from "../store/basket";
import { addProductToFavourite, getFavouritesProductsList } from "../store/favourites";

export default function useProductInfo(product) {
  const dispatch = useDispatch();

  const basketEntities = useSelector(getBasketEntities());
  const favouritesEntities = useSelector(getFavouritesProductsList());

  const isProductInBasket = basketEntities.find((p) => p.productId === product._id);
  const isProductInFavourites = favouritesEntities.find((p) => p._id === product._id);

  const handleClickProductToBasket = (product) => {
    dispatch(addProductToBasket(product));
  };

  const handleClickProductToFavourite = (product) => {
    dispatch(addProductToFavourite(product));
  };

  return {
    isProductInBasket,
    isProductInFavourites,
    handleClickProductToBasket,
    handleClickProductToFavourite,
  };
}
