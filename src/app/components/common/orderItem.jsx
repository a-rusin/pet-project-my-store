import Loader from "./loader";
import formatDate from "./../../utils/formatDate";
import formatNumber from "../../utils/formatNumber";
import { Link } from "react-router-dom";

const OrderItem = ({ data, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="feedback-item-content">
          <p className="feedback-item-text">
            <strong>Имя: </strong>
            {data && data.name}
          </p>
          <p className="feedback-item-text">
            <strong>Email: </strong>
            {data && data.email}
          </p>
          <p className="feedback-item-text">
            <strong>Мобильный номер: </strong>
            {data && data.phone}
          </p>
          <p className="feedback-item-text">
            <strong>Адрес доставки: </strong>
            {data && data.location}
          </p>
          <p className="feedback-item-text">
            <strong>Дата заказа: </strong>
            {data && formatDate(data.createdAt)}
          </p>
          <p className="feedback-item-text">
            <strong>Сумма заказа: </strong>
            {data && formatNumber(data.totalPrice) + " ₽"}
          </p>
          <div className="feedback-item-text">
            <strong>Список товаров: </strong>
            {data && (
              <table className="order-table">
                <thead>
                  <tr>
                    <th>№</th>
                    <th>Название</th>
                    <th>Кол-во</th>
                    <th>Цена за шт</th>
                    <th>Цена общая</th>
                  </tr>
                </thead>
                <tbody>
                  {data.products.map((p, i) => (
                    <tr key={i}>
                      <td style={{ width: "5%" }}>{i}</td>
                      <td style={{ width: "55%" }}>
                        <Link to={`/products/item/${p.productInfo._id}`} target="_blank" className="order-table-url">
                          {p.productInfo.name}
                        </Link>
                      </td>
                      <td style={{ width: "10%" }}>{p.count}</td>
                      <td style={{ width: "15%" }}>{formatNumber(p.productInfo.price) + " ₽"}</td>
                      <td style={{ width: "15%" }}>{formatNumber(p.productInfo.price * p.count) + " ₽"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default OrderItem;
