import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productsService from "../../services/products.service";
import Loader from "../common/loader";
import ProductCard from "../ui/products/productCard";
import CommentsList from "../ui/comments/commentsList";

const ProductPage = () => {
  const { productId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [productInfo, setProductInfo] = useState({});
  const [title, setTitle] = useState(document.title);

  useEffect(() => {
    getProductInfo(productId);
  }, [productId]);

  useEffect(() => {
    const initalTitle = document.title;

    document.title = title;

    return () => {
      document.title = initalTitle;
    };
  }, [title]);

  const getProductInfo = async (productId) => {
    try {
      setTitle("Загрузка...");
      const data = await productsService.getProductById(productId);
      setIsLoading(false);
      setProductInfo(data);
      setTitle(data.name);
    } catch (error) {}
  };

  return (
    <div className="product-card">
      <h2 className="product-card-title">
        {isLoading ? "Загрузка товара..." : productInfo.name}
      </h2>
      {isLoading ? (
        <div className="product-card-wrapper">
          <Loader />
        </div>
      ) : (
        <>
          <ProductCard productInfo={productInfo} />
          <CommentsList productId={productId} />
        </>
      )}
    </div>
  );
};

export default ProductPage;
