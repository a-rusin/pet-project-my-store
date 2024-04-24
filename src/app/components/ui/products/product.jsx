import { useDispatch, useSelector } from "react-redux";
import { addProductToBasket, getBasketEntities } from "../../../store/basket";
import formatNumber from "../../../utils/formatNumber";

const Product = ({ product }) => {
  const { _id: productId, name: productName, description, category, rage, reviews, price, stokes, bonus, availability, image } = product;

  const dispatch = useDispatch();

  const handleClickProductToBasket = (productId) => {
    dispatch(addProductToBasket(productId));
  };

  const basketEntities = useSelector(getBasketEntities());

  const isProductInBasket = basketEntities.find((product) => product._id === productId);

  return (
    <li className="products-item">
      <div className="product-info-wrapper">
        <img src={image} className="product-img" />
        <div className="product-main-info">
          <h2 className="product-name">{productName}</h2>
          <p className="product-info-text">{description}</p>
          <p className="product-info-text">Категория: {category}</p>
          <p className="product-info-text">Рейтинг: {rage}</p>
          <p className="product-info-text">Отзывы: {reviews}</p>
          <p className="product-info-text">Артикул: 1234567890</p>
        </div>
        <div className="product-action-block">
          <div className="product-price-group">
            <p className="product-price">{formatNumber(price.toString())} ₽</p>
            <p className="product-bonus">+{bonus} бонусов</p>
            <p className="product-availability">{availability}</p>
          </div>
          <div className="product-btns-group">
            <button
              className={isProductInBasket ? "product-btn product-btn-buy active" : "product-btn product-btn-buy"}
              onClick={() => handleClickProductToBasket(productId)}
              disabled={isProductInBasket}
            >
              {isProductInBasket ? "Уже в корзине" : "В корзину"}
            </button>
            <button className="product-btn product-btn-fav">
              <svg
                width="800px"
                height="800px"
                viewBox="0 0 24 24"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                aria-labelledby="favouriteIconTitle"
                stroke="#5802a3"
                strokeWidth="1"
                strokeLinecap="square"
                strokeLinejoin="miter"
                fill="none"
                color="#5802a3"
              >
                {" "}
                <title id="favouriteIconTitle">Favourite</title>{" "}
                <path d="M12,21 L10.55,19.7051771 C5.4,15.1242507 2,12.1029973 2,8.39509537 C2,5.37384196 4.42,3 7.5,3 C9.24,3 10.91,3.79455041 12,5.05013624 C13.09,3.79455041 14.76,3 16.5,3 C19.58,3 22,5.37384196 22,8.39509537 C22,12.1029973 18.6,15.1242507 13.45,19.7149864 L12,21 Z" />{" "}
              </svg>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Product;
