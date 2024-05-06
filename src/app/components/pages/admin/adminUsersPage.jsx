import { useEffect, useState } from "react";
import ListItems from "../../common/listItems/listItems";
import authService from "../../../services/auth.service";

const AdminUsersPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const data = await authService.getAllUsers();
      setUsers(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <h1 className="admin-route-title">Все пользователи</h1>
      <div className="admin-main-content-list">
        {isLoading ? "Загрузка..." : <ListItems items={users} />}
      </div>
    </>
  );
};

export default AdminUsersPage;
