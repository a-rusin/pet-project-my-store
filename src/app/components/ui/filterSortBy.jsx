const filtersSort = [
  { id: 0, name: "По популярности", key: "reviews", direction: "desc" },
  { id: 1, name: "Сначала дорогие", key: "price", direction: "desc" },
  { id: 2, name: "Сначала дешевые", key: "price", direction: "asc" },
  { id: 3, name: "По наименованию", key: "name", direction: "asc" },
];

const FilterSortBy = ({ handleFilterChange, currentSortFilter }) => {
  return (
    <div className="filter-sort">
      <ul className="filter-sort-list">
        {filtersSort.map((item) => (
          <li
            className={item.key === currentSortFilter.key && item.direction === currentSortFilter.direction ? "filter-sort-item active" : "filter-sort-item"}
            key={item.id}
            onClick={() => handleFilterChange(item.key, item.direction)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterSortBy;
