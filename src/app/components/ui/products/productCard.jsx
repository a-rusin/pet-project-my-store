import { useSelector } from "react-redux";
import useProductInfo from "../../../hooks/useProductInfo";
import formatNumber from "../../../utils/formatNumber";
import AddToFavouriteButton from "../../common/buttons/addToFavouriteBtn";
import BuyButton from "../../common/buttons/buyButton";
import { getCategoriesLoadingStatus, getCategoryNameById } from "../../../store/categories";
import ProductBonus from "../../common/product/productBonus";

const ProductCard = ({ productInfo }) => {
  const { isProductInBasket, isProductInFavourites, handleClickProductToBasket, handleClickProductToFavourite } = useProductInfo(productInfo);

  const categoryItem = useSelector(getCategoryNameById(productInfo.category));
  const isCategoryLoading = useSelector(getCategoriesLoadingStatus());

  console.log(categoryItem);

  console.log(productInfo);

  return (
    <div className="product-card-wrapper">
      <div className="product-card-block">
        <img src={productInfo.image} alt="" className="product-card-image" />
        <div className="product-card-main-info">
          <p className="product-card-name">{productInfo.name}</p>
          <p className="product-card-other-text">
            <strong>Описание:</strong> {productInfo.description}
          </p>
          <p className="product-card-other-text">
            <strong>Категории:</strong> {isCategoryLoading ? "загрузка..." : categoryItem.name}
          </p>
          <p className="product-card-other-text">
            <strong>Оценка:</strong> {productInfo.rage}
          </p>
          <p className="product-card-other-text">
            <strong>Статус:</strong> {productInfo.availability}
          </p>
          <p className="product-card-other-text">
            <strong>Отзывы и комментарии:</strong> {productInfo.reviews}
          </p>
          <p className="product-card-other-text">
            <strong>Артикул:</strong> {productInfo._id}
          </p>
          <div className="product-card-bottom-group">
            <div className="product-card-price-group">
              <p className="product-card-price">{formatNumber(productInfo.price.toString())} ₽</p>
              <ProductBonus bonus={productInfo.bonus} />
            </div>
            <div className="product-card-btns-group">
              <BuyButton isProductInBasket={isProductInBasket} handleClickProductToBasket={handleClickProductToBasket} product={productInfo} />
              <AddToFavouriteButton
                isProductInFavourites={isProductInFavourites}
                handleClickProductToFavourite={handleClickProductToFavourite}
                product={productInfo}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
