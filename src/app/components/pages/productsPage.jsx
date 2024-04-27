import { useDispatch, useSelector } from "react-redux";
import CategoriesList from "../ui/categoriesList";
import Filters from "../ui/filters";
import ProductsList from "../ui/products/productsList";
import Slider from "../ui/slider";
import { getProductsList, getProductsLoadingStatus, loadProductsList } from "../../store/products";
import { useEffect, useState } from "react";
import paginate from "../../utils/paginate";
import Loader from "../common/loader";
import _ from "lodash";
import { useParams } from "react-router-dom";
import { getCategoriesLoadingStatus, getCategoryNameByPath } from "../../store/categories";

const filterDefaultValue = {
  key: "reviews",
  direction: "desc",
};

const ProductsPage = () => {
  const { productsCategory } = useParams();

  useEffect(() => {
    dispatch(loadProductsList(productsCategory));
    setCurrentPage(1);
    setCurrentSortFilter(filterDefaultValue);
  }, [productsCategory]);

  const dispatch = useDispatch();

  const activeCategory = useSelector(getCategoryNameByPath(productsCategory));
  const isCategoryLoading = useSelector(getCategoriesLoadingStatus());

  const categoryName = activeCategory ? activeCategory.name : "Все товары";

  const [currentPage, setCurrentPage] = useState(1);

  const [currentSortFilter, setCurrentSortFilter] = useState(filterDefaultValue);

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
          <h2 className="products-list-title">{!isCategoryLoading && categoryName}</h2>
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
