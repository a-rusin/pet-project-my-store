import { useEffect, useState } from "react";
import ListItems from "../../common/listItems/listItems";
import authService from "../../../services/auth.service";
import Modal from "../../common/modal";
import UserItem from "../../common/userItem";

const AdminUsersPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [isModalEditActive, setIsModalEditActive] = useState(false);
  const [userItem, setUserItem] = useState(null);

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

  const onClickOpen = (userId) => {
    setIsModalEditActive(true);
    setUserItem(users.find((u) => u._id === userId));
  };

  return (
    <>
      <h1 className="admin-route-title">Все пользователи</h1>
      <div className="admin-main-content-list">{isLoading ? "Загрузка..." : <ListItems items={users} onClickOpen={onClickOpen} />}</div>
      <Modal isOpen={isModalEditActive} setIsOpen={setIsModalEditActive} title="Сообщение">
        <UserItem user={userItem} />
      </Modal>
    </>
  );
};

export default AdminUsersPage;
