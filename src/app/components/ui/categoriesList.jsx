import { useEffect } from "react";
import categoriesService from "../../services/categories.service";
import { useSelector, useDispatch } from "react-redux";
import { getCategoriesList, loadCategoriesList } from "./../../store/categories";

const CategoriesList = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getCategoriesList());

  useEffect(() => {
    dispatch(loadCategoriesList());
  }, []);

  return (
    <div className="category-wrapper">
      <h2 className="category-list-title">Каталог товаров</h2>
      <ul className="category-list">
        {categories.map((category) => (
          <li className="category-item" key={category._id}>
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesList;
