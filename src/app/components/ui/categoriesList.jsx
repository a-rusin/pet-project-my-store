import { useSelector, useDispatch } from "react-redux";
import { getCategoriesList, getCategoriesLoadingStatus, loadCategoriesList } from "./../../store/categories";
import Loader from "../common/loader";

const CategoriesList = () => {
  const categories = useSelector(getCategoriesList());
  const isCategoriesLoading = useSelector(getCategoriesLoadingStatus());

  return (
    <div className="category-wrapper">
      <h2 className="category-list-title">Каталог товаров</h2>
      {isCategoriesLoading ? (
        <Loader />
      ) : (
        <ul className="category-list">
          {categories.map((category) => (
            <li className="category-item" key={category._id}>
              {category.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoriesList;
