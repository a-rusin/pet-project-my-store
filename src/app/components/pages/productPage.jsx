import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { productId } = useParams();

  return <div>ProductPage - item: {productId}</div>;
};

export default ProductPage;
