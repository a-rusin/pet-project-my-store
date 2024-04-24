import Product from "./product";

const ProductsList = ({ products }) => {
  return (
    <div className="products-wrapper">
      <ul className="products-list">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
