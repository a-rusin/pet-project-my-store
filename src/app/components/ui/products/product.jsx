import formatNumber from "../../../utils/formatNumber";
import { Link } from "react-router-dom";
import BuyButton from "../../common/buttons/buyButton";
import AddToFavouriteButton from "../../common/buttons/addToFavouriteBtn";
import useProductInfo from "../../../hooks/useProductInfo";
import { useSelector } from "react-redux";
import {
  getCategoriesLoadingStatus,
  getCategoryNameByPath,
} from "../../../store/categories";
import ProductBonus from "../../common/product/productBonus";

const Product = ({ product }) => {
  const {
    _id: productId,
    name: productName,
    description,
    category,
    rage,
    reviews,
    price,
    stokes,
    bonus,
    availability,
    image,
  } = product;

  const {
    isProductInBasket,
    isProductInFavourites,
    handleClickProductToBasket,
    handleClickProductToFavourite,
  } = useProductInfo(product);

  const categoryItem = useSelector(getCategoryNameByPath(category));
  const isCategoryLoading = useSelector(getCategoriesLoadingStatus());

  return (
    <li className="products-item">
      <div className="product-info-wrapper">
        <img src={image} className="product-img" />
        <div className="product-main-info">
          <Link to={`/products/item/${productId}`} className="product-name">
            {productName}
          </Link>
          <p className="product-info-text">{description}</p>
          <p className="product-info-text">
            Категория:{" "}
            {isCategoryLoading
              ? "Загрузка..."
              : categoryItem
              ? categoryItem.name
              : "None"}
          </p>
          <p className="product-info-text">Рейтинг: {rage}</p>
          <p className="product-info-text">Отзывы: {reviews}</p>
          <p className="product-info-text">Артикул: {productId}</p>
        </div>
        <div className="product-action-block">
          <div className="product-price-group">
            <p className="product-price">{formatNumber(price.toString())} ₽</p>
            <ProductBonus bonus={bonus} />
            <p className="product-availability">{availability}</p>
          </div>
          <div className="product-btns-group">
            <BuyButton
              isProductInBasket={isProductInBasket}
              handleClickProductToBasket={handleClickProductToBasket}
              product={product}
            />
            <AddToFavouriteButton
              isProductInFavourites={isProductInFavourites}
              handleClickProductToFavourite={handleClickProductToFavourite}
              product={product}
            />
          </div>
        </div>
      </div>
    </li>
  );
};

export default Product;
