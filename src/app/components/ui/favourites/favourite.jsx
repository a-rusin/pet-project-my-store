import { useDispatch } from "react-redux";
import formatNumber from "../../../utils/formatNumber";
import { addProductToFavourite } from "../../../store/favourites";

const Favourite = ({ product }) => {
  const dispatch = useDispatch();

  const handleClick = (product) => {
    dispatch(addProductToFavourite(product));
  };

  return (
    <li className="favourites-item">
      <div className="favourites-left-part">
        <a href="" className="favourites-item-url">
          {product.name}
        </a>
        <p className="favourites-descr">{product.description}</p>
      </div>
      <div className="favourites-right-part">
        <p className="favourites-price">{formatNumber(product.price.toString())} ₽</p>
        <button className="favourites-item-btn" onClick={() => handleClick(product)}>
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
            fill="#5802a3"
            color="#5802a3"
          >
            {" "}
            <title id="favouriteIconTitle">Favourite</title>{" "}
            <path d="M12,21 L10.55,19.7051771 C5.4,15.1242507 2,12.1029973 2,8.39509537 C2,5.37384196 4.42,3 7.5,3 C9.24,3 10.91,3.79455041 12,5.05013624 C13.09,3.79455041 14.76,3 16.5,3 C19.58,3 22,5.37384196 22,8.39509537 C22,12.1029973 18.6,15.1242507 13.45,19.7149864 L12,21 Z" />{" "}
          </svg>
        </button>
      </div>
    </li>
  );
};

export default Favourite;
