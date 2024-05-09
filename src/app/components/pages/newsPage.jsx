import { useEffect } from "react";
import { useState } from "react";
import newsService from "../../services/news.service";
import Loader from "../common/loader";
import formatDate from "../../utils/formatDate";
import paginate from "../../utils/paginate";
import Pagination from "../common/pagination";

const NewsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 3;

  const newsCrop = paginate(news, currentPage, pageSize);

  console.log(newsCrop);

  const getAllNews = async () => {
    try {
      setIsLoading(true);
      const data = await newsService.getAll();
      setNews(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllNews();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <h1 className="page-title">Новости</h1>
      {isLoading ? (
        <div className="page-wrapper">
          <Loader />{" "}
        </div>
      ) : (
        <>
          {news.length === 0 ? (
            "Новостей пока нет"
          ) : (
            <>
              <ul className="news-list">
                {newsCrop.map((item) => (
                  <li className="news-item" key={item._id}>
                    <p className="news-item-date">{formatDate(item.createdAt)}</p>

                    <p className="news-item-title">{item.name}</p>
                    <p className="news-item-full-text">{item.fullText}</p>
                  </li>
                ))}
              </ul>
              <Pagination items={news} pageSize={pageSize} onPageChange={handlePageChange} currentPage={currentPage} justifyContent="center" />
            </>
          )}
        </>
      )}
    </>
  );
};

export default NewsPage;
