const BasketListItem = ({ product }) => {
  return (
    <li className="basket-item" key={product._id}>
      <div className="basket-item-wrapper">
        <img src={product.image} className="basket-item-img" />
        <div className="basket-item-main-info">
          <p className="basket-item-product-name">{product.name}</p>
          <p className="basket-item-product-descr">{product.description}</p>
          <div className="basket-item-counter">
            <button className="basket-item-counter-btn basket-item-counter-btn-plus">+</button>
            <p className="basket-item-counter-count">1</p>
            <button className="basket-item-counter-btn basket-item-counter-btn-minus">-</button>
          </div>
        </div>
        <div className="bastet-item-ctrl-group">
          <p className="basket-item-price">{product.price} ₽</p>
          <button className="basket-item-btn-delete">
            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
                stroke="#777"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
};

export default BasketListItem;
