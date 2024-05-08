import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../store/auth";
import ordersService from "../../services/orders.service";
import Loader from "../common/loader";
import OrderItem from "../common/orderItem";
import LoaderSpinner from "../common/loaderSpinner";

const ProfileOrdersPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userOrders, setUserOrders] = useState([]);
  const currentUser = useSelector(getCurrentUser());

  const getUserOrders = async () => {
    try {
      setIsLoading(true);
      const userId = currentUser._id;
      const data = await ordersService.getUserOrders(userId);
      setUserOrders(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserOrders();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      {userOrders.length === 0 ? (
        "Спусок покупок пока пуст"
      ) : (
        <ul className="user-orders-list">
          {userOrders.map((order) => (
            <li key={order._id} className="user-orders-item">
              <OrderItem data={order} loader={LoaderSpinner} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ProfileOrdersPage;
