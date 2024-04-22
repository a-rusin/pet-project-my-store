import { useSelector } from "react-redux";
import CategoriesList from "../ui/categoriesList";
import Filters from "../ui/filters";
import ProductsList from "../ui/products/productsList";
import Slider from "../ui/slider";
import { useParams } from "react-router-dom";
import { getProductsLoadingStatus } from "../../store/products";

const ProductsPage = () => {
  const { productsCategory } = useParams();

  const isProductsLoading = useSelector(getProductsLoadingStatus());

  return (
    <>
      <h1>{productsCategory}</h1>
      <Slider />
      <div className="main-part">
        <div className="left-part">
          <CategoriesList />
        </div>
        <div className="right-part">
          {!isProductsLoading && <Filters />}

          <ProductsList />
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
