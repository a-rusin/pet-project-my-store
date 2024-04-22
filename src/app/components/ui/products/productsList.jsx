import Product from "./product";

const products = [
  { id: 0, name: "Корпус BaseTech eXtreme GFX-03, Midi-Tower, без БП, черный" },
  { id: 1, name: "Корпус BaseTech eXtreme GFX-03, Midi-Tower, без БП, черный" },
  { id: 2, name: "Корпус BaseTech eXtreme GFX-03, Midi-Tower, без БП, черный" },
  { id: 3, name: "Корпус BaseTech eXtreme GFX-03, Midi-Tower, без БП, черный" },
  { id: 4, name: "Корпус BaseTech eXtreme GFX-03, Midi-Tower, без БП, черный" },
];

const ProductsList = () => {
  return (
    <div className="products-wrapper">
      <h2 className="products-list-title">Все товары</h2>
      <ul className="products-list">
        {products.map((product) => (
          <Product key={product.id} />
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
