const Filters = () => {
  return (
    <div className="products-filter">
      <div className="products-filter-wrapper">
        <p className="products-filter-title">Сортировать по:</p>
        <ul className="products-filter-list">
          <li className="products-filter-item active">Сначала дорогие</li>
          <li className="products-filter-item">Сначала дешевые</li>
          <li className="products-filter-item">По наименованию</li>
          <li className="products-filter-item">По популярности</li>
        </ul>
      </div>
    </div>
  );
};

export default Filters;
