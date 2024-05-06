import { useDispatch, useSelector } from "react-redux";
import { isRoleIncluded, logOut } from "../../../store/auth";
import { Link } from "react-router-dom";

const UserMenu = ({ isUserMenuOpen }) => {
  const dispatch = useDispatch();
  const isAdmin = useSelector(isRoleIncluded("ADMIN"));

  const logOutUser = () => {
    dispatch(logOut());
  };

  return (
    <ul className={isUserMenuOpen ? "user-menu" : "user-menu hide"}>
      <li>
        <Link to="" className="user-menu-item">
          Мой профиль
        </Link>
      </li>

      {isAdmin && (
        <li>
          <Link
            to="/admin"
            className="user-menu-item"
            target="_blank"
            rel="noopener noreferrer"
          >
            Админ панель
          </Link>
        </li>
      )}
      <li>
        <Link to="" className="user-menu-item" onClick={logOutUser}>
          Выйти
        </Link>
      </li>
    </ul>
  );
};

export default UserMenu;
