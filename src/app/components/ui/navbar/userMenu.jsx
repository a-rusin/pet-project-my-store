import { useDispatch } from "react-redux";
import { logOut } from "../../../store/auth";

const UserMenu = ({ isUserMenuOpen }) => {
  const dispatch = useDispatch();

  const logOutUser = () => {
    dispatch(logOut());
  };

  return (
    <ul className={isUserMenuOpen ? "user-menu" : "user-menu hide"}>
      <li className="user-menu-item">Мой профиль</li>
      <li className="user-menu-item" onClick={logOutUser}>
        Выйти
      </li>
    </ul>
  );
};

export default UserMenu;
