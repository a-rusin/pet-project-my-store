import { useEffect, useState } from "react";
import Product from "./product";
import { useDispatch, useSelector } from "react-redux";
import { getProductsList, getProductsLoadingStatus } from "../../../store/products";
import Loader from "../../common/loader";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";

const ProductsList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const products = useSelector(getProductsList());
  const isProductsLoading = useSelector(getProductsLoadingStatus());

  const pageSize = 5;

  const productsCrop = paginate(products, currentPage, pageSize);

  console.log(productsCrop);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="products-wrapper">
      <h2 className="products-list-title">Все товары</h2>
      {isProductsLoading ? (
        <li className="products-item products-item-loader">
          <Loader />
        </li>
      ) : (
        <>
          <ul className="products-list">
            {productsCrop.map((product) => (
              <Product key={product._id} product={product} />
            ))}

            <Pagination items={products} pageSize={pageSize} onPageChange={handlePageChange} currentPage={currentPage} />
          </ul>
        </>
      )}
    </div>
  );
};

export default ProductsList;
