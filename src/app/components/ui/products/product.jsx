const Product = () => {
  return (
    <li className="products-item">
      <div className="product-info-wrapper">
        <img src="https://s3.e2e4.ru/imgproxy/3259482" className="product-img" />
        <div className="product-main-info">
          <h2 className="product-name">Корпус BaseTech eXtreme GFX-03, Midi-Tower, без БП, черный</h2>
          <p className="product-info-text">Корпус BaseTech eXtreme GFX-03, ATX, Midi-Tower, USB 3.0, RGB подсветка, черный, без БП (BT-GFX-03-MESH-4F-RGB)</p>
          <p className="product-info-text">Категория: комплектующие</p>
          <p className="product-info-text">Рейтинг: 5</p>
          <p className="product-info-text">Отзывы: 23</p>
          <p className="product-info-text">Артикул: 1234567890</p>
        </div>
        <div className="product-action-block">
          <div className="product-price-group">
            <p className="product-price">5 600 ₽</p>
            <p className="product-bonus">+5 бонусов</p>
            <p className="product-availability">В налачии</p>
          </div>
          <div className="product-btns-group">
            <button className="product-btn product-btn-buy">Купить</button>
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
