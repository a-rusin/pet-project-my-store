import formatDate from "./../../utils/formatDate";
import formatNumber from "../../utils/formatNumber";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import productsService from "../../services/products.service";

const OrderItem = ({ data, setIsLoadingOrderItem, loader: Loader }) => {
  const [currentOrder, setCurrentOrder] = useState(null);
  const [fullContent, setFullContent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getOrderInfo = async () => {
    try {
      if (data) {
        if (setIsLoadingOrderItem) {
          setIsLoadingOrderItem(true);
        }
        setIsLoading(true);
        const payload = data.products.map((p) => p.productId);
        const productInfoData = await productsService.getProductsByArray(payload);
        const currentOrderItem = {
          ...data,
          products: data.products.map((p) => ({ ...p, productInfo: productInfoData.find((d) => d._id === p.productId) })),
        };
        setCurrentOrder(currentOrderItem);
        setIsLoading(false);

        if (setIsLoadingOrderItem) {
          setIsLoadingOrderItem(false);
        }
      }
    } catch (error) {}
    if (setIsLoadingOrderItem) {
      setIsLoadingOrderItem(false);
    }
  };

  useEffect(() => {
    setCurrentOrder(null);
    getOrderInfo();
  }, [data]);

  const handleClickShowMore = () => {
    setFullContent((prev) => !prev);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="feedback-item-content">
          <p className="feedback-item-text">
            <strong>Имя получателя: </strong>
            {currentOrder && currentOrder.name}
          </p>
          <p className="feedback-item-text">
            <strong>Email получателя: </strong>
            {currentOrder && currentOrder.email}
          </p>
          <p className="feedback-item-text">
            <strong>Мобильный номер получателя: </strong>
            {currentOrder && currentOrder.phone}
          </p>
          <p className="feedback-item-text">
            <strong>Адрес доставки получателя: </strong>
            {currentOrder && currentOrder.location}
          </p>
          <p className="feedback-item-text">
            <strong>Дата заказа: </strong>
            {currentOrder && formatDate(currentOrder.createdAt)}
          </p>
          <p className="feedback-item-text">
            <strong>Сумма заказа: </strong>
            {currentOrder && formatNumber(currentOrder.totalPrice) + " ₽"}
          </p>
          {fullContent && (
            <div className="feedback-item-text">
              <strong>Список товаров: </strong>
              {currentOrder && (
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
                    {currentOrder.products.map((p, i) => (
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
          )}

          <button className="show-more-btn" onClick={handleClickShowMore}>
            {fullContent ? "Скрыть товары" : "Показать товары"}
          </button>
        </div>
      )}
    </>
  );
};

export default OrderItem;
