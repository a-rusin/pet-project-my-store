const BuyButton = ({ isProductInBasket, handleClickProductToBasket, product }) => {
  return (
    <button
      className={isProductInBasket ? "product-btn product-btn-buy active" : "product-btn product-btn-buy"}
      onClick={() => handleClickProductToBasket(product)}
      disabled={isProductInBasket}
    >
      {isProductInBasket ? "Уже в корзине" : "В корзину"}
    </button>
  );
};

export default BuyButton;
