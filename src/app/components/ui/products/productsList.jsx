import { useEffect } from "react";
import Product from "./product";
import { useDispatch, useSelector } from "react-redux";
import { getProductsList, getProductsLoadingStatus, loadProductsList } from "../../../store/products";
import Loader from "../../common/loader";

const ProductsList = () => {
  const products = useSelector(getProductsList());
  const isProductsLoading = useSelector(getProductsLoadingStatus());

  return (
    <div className="products-wrapper">
      <h2 className="products-list-title">Все товары</h2>
      {isProductsLoading ? (
        <li className="products-item products-item-loader">
          <Loader />
        </li>
      ) : (
        <ul className="products-list">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductsList;
