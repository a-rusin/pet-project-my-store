import { useEffect, useState } from "react";
import useQuery from "../../hooks/useQuery";
import productsService from "../../services/products.service";
import Loader from "../common/loader";
import Product from "../ui/products/product";

const ProductsSearchPage = () => {
  const query = useQuery();

  const searchText = query.get("text");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProductList = async (searchText) => {
    try {
      setLoading(true);
      const data = await productsService.getProductsBySearch(searchText);
      setProducts(data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductList(searchText);
  }, [searchText]);

  return (
    <>
      <h1 className="search-title">
        Результат поиска по запросу: {searchText}
      </h1>
      <div className="search-wrapper">
        {loading ? (
          <div className="search-loading">
            <Loader />
          </div>
        ) : products.length === 0 ? (
          "Ничего не найдено. Проверьте поисковой запрос и попробуйте еще раз"
        ) : (
          <ul className="search-list">
            {products.map((product) => (
              <Product product={product} key={product._id} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default ProductsSearchPage;
