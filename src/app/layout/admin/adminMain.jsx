import { useSelector } from "react-redux";
import { getCurrentUser } from "../../store/auth";

const AdminMain = () => {
  const currentUser = useSelector(getCurrentUser());

  return (
    <>
      <h1 className="admin-route-title">Главная</h1>
      <div className="admin-main-content-list">
        Добро пожаловать в админ панель, {currentUser.name}!
      </div>
    </>
  );
};

export default AdminMain;
