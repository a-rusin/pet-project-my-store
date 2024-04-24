import Pagination from "../common/pagination";
import FilterSortBy from "./filterSortBy";

const Filters = ({ products, pageSize, handlePageChange, currentPage, handleFilterChange, currentSortFilter }) => {
  return (
    <div className="filters">
      <div className="filters-wrapper">
        <div className="filters-item">
          <p className="filters-item-title">Сортировать по: </p>
          <FilterSortBy handleFilterChange={handleFilterChange} currentSortFilter={currentSortFilter} />
        </div>
        <div className="filters-item">
          <p className="filters-item-title">Номер страницы: </p>
          <Pagination items={products} pageSize={pageSize} onPageChange={handlePageChange} currentPage={currentPage} />
        </div>
      </div>
    </div>
  );
};

export default Filters;
