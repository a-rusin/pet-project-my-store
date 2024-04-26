import { useSelector, useDispatch } from "react-redux";
import { getCategoriesList, getCategoriesLoadingStatus, loadCategoriesList } from "./../../store/categories";
import Loader from "../common/loader";
import { Link, useParams } from "react-router-dom";
import { getProductsLoadingStatus } from "../../store/products";

const CategoriesList = () => {
  const categories = useSelector(getCategoriesList());
  const isCategoriesLoading = useSelector(getCategoriesLoadingStatus());
  const isProductsLoading = useSelector(getProductsLoadingStatus());

  const { productsCategory } = useParams();

  const getClassForCategoryItem = (categoryPath) => {
    let categoryItemClasses = "category-item-url";
    if (categoryPath === productsCategory) {
      categoryItemClasses += " active";
    }
    if (isProductsLoading) {
      categoryItemClasses += " disabled";
    }
    return categoryItemClasses;
  };

  return (
    <div className="category-wrapper">
      <h2 className="category-list-title">Каталог товаров</h2>
      {isCategoriesLoading ? (
        <Loader />
      ) : (
        <ul className="category-list">
          {categories.map((category) => (
            <li key={category._id} className="category-list-item">
              <Link to={"/products/" + category.path} className={getClassForCategoryItem(category.path)}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoriesList;
