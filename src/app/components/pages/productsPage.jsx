import { useSelector } from "react-redux";
import CategoriesList from "../ui/categoriesList";
import Filters from "../ui/filters";
import ProductsList from "../ui/products/productsList";
import Slider from "../ui/slider";
import { getProductsList, getProductsLoadingStatus } from "../../store/products";
import { useState } from "react";
import paginate from "../../utils/paginate";
import Loader from "../common/loader";
import _ from "lodash";

const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSortFilter, setCurrentSortFilter] = useState({
    key: "reviews",
    direction: "desc",
  });

  const isProductsLoading = useSelector(getProductsLoadingStatus());

  const products = useSelector(getProductsList());

  const pageSize = 6;

  const filteredUser = _.orderBy(
    products,
    (product) => {
      const nubmer = parseInt(product[currentSortFilter.key]);

      return nubmer ? nubmer : product[currentSortFilter.key];
    },
    [currentSortFilter.direction]
  );

  const productsCrop = paginate(filteredUser, currentPage, pageSize);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterSortChange = (key, direction) => {
    setCurrentSortFilter({
      key,
      direction,
    });
    setCurrentPage(1);
  };

  return (
    <>
      <Slider />
      <div className="main-part">
        <div className="left-part">
          <CategoriesList />
        </div>
        <div className="right-part">
          <h2 className="products-list-title">Все товары</h2>
          {isProductsLoading ? (
            <li className="products-item products-item-loader">
              <Loader />
            </li>
          ) : (
            <>
              <Filters
                products={products}
                pageSize={pageSize}
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                handleFilterChange={handleFilterSortChange}
                currentSortFilter={currentSortFilter}
              />
              <ProductsList products={productsCrop} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
