const categories = [
  { id: 0, name: "Бытовая техника" },
  { id: 1, name: "Красота и здоровье" },
  { id: 2, name: "Смартфоны" },
  { id: 3, name: "Гаджеты" },
  { id: 4, name: "ТВ, консоли" },
  { id: 5, name: "Аудио" },
  { id: 6, name: "Офис и мебель" },
  { id: 7, name: "Ноутбуки" },
  { id: 8, name: "Комплектующие для ПК" },
  { id: 9, name: "Сетевое оборудование" },
  { id: 10, name: "Инструмент и стройка" },
  { id: 11, name: "Садовая техника" },
  { id: 12, name: "Автотовары" },
  { id: 13, name: "Аксесуары" },
  { id: 14, name: "Отдых и развлечения" },
];

const CategoriesList = () => {
  return (
    <div className="category-wrapper">
      <h2 className="category-list-title">Каталог товаров</h2>
      <ul className="category-list">
        {categories.map((category) => (
          <li className="category-item" key={category.id}>
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesList;
