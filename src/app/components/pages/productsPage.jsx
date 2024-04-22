import CategoriesList from "../ui/categoriesList";
import Filters from "../ui/filters";
import ProductsList from "../ui/products/productsList";
import Slider from "../ui/slider";
import { useParams } from "react-router-dom";

const ProductsPage = () => {
  const { productsCategory } = useParams();

  return (
    <>
      <h1>{productsCategory}</h1>
      <Slider />
      <div className="main-part">
        <div className="left-part">
          <CategoriesList />
        </div>
        <div className="right-part">
          <Filters />
          <ProductsList />
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
