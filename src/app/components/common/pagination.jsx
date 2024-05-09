import _ from "lodash";

const Pagination = ({ items, pageSize, onPageChange, currentPage, justifyContent }) => {
  const pageCount = Math.ceil(items.length / pageSize);

  const pages = _.range(1, pageCount + 1);

  return (
    <nav className="pagination" style={{ justifyContent }}>
      <ul className="pagination-list">
        {pages.map((page) => (
          <li className={page === currentPage ? "pagination-item active" : "pagination-item"} key={page} onClick={() => onPageChange(page)}>
            {page}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
