import { useEffect, useState } from "react";
import productsService from "../../../services/products.service";
import ordersService from "../../../services/orders.service";
import ListItems from "../../common/listItems/listItems";
import Modal from "../../common/modal";
import OrderItem from "../../common/orderItem";
import Loader from "../../common/loader";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [isLoadingOrderItem, setIsLoadingOrderItem] = useState(false);
  const [currentOrderItem, setCurrentOrderItem] = useState(null);
  const [isModalEditActive, setIsModalEditActive] = useState(false);

  const getOrders = async () => {
    try {
      setIsLoadingPage(true);
      const data = await ordersService.getAll();
      setOrders(data);
      setIsLoadingPage(false);
    } catch (error) {
      setIsLoadingPage(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const onClickOpen = (orderId) => {
    setIsModalEditActive(true);
    const orderItem = orders.find((o) => o._id === orderId);
    setCurrentOrderItem(orderItem);
  };

  return (
    <>
      <h1 className="admin-route-title">Все заказы</h1>
      <div className="admin-main-content-list">
        {isLoadingPage ? (
          "Загрузка..."
        ) : (
          <>
            <ListItems items={orders} onClickOpen={onClickOpen} btnDisabled={isLoadingOrderItem} />
            <Modal isOpen={isModalEditActive} setIsOpen={setIsModalEditActive} title="Заказ" modalWidth={1000}>
              <OrderItem data={currentOrderItem} setIsLoadingOrderItem={setIsLoadingOrderItem} isLoadingOrderItem={isLoadingOrderItem} loader={Loader} />
            </Modal>
          </>
        )}
      </div>
    </>
  );
};

export default AdminOrdersPage;
