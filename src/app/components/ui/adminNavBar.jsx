import { Link } from "react-router-dom";

const AdminNavBar = () => {
  return (
    <div className="admin-navbar">
      <div className="admin-navbar-content">
        <h2 className="admin-navbar-title">Меню</h2>
        <ul className="admin-navbar-list">
          <li>
            <Link to="/admin" className="admin-navbar-item">
              Главная
            </Link>
          </li>
          <li>
            <Link to="/admin/categories" className="admin-navbar-item">
              Категории
            </Link>
          </li>
          <li>
            <Link to="/admin/products" className="admin-navbar-item">
              Товары
            </Link>
          </li>
          <li>
            <Link to="/admin/users" className="admin-navbar-item">
              Пользователи
            </Link>
          </li>
          <li>
            <Link to="/admin/slider" className="admin-navbar-item">
              Слайдер
            </Link>
          </li>
          <li>
            <Link to="/admin/orders" className="admin-navbar-item">
              Заказы
            </Link>
          </li>
          <li>
            <Link to="/admin/feedback" className="admin-navbar-item">
              Обратная связь
            </Link>
          </li>
          <li>
            <Link to="/admin/settings" className="admin-navbar-item">
              Общие настройки
            </Link>
          </li>
        </ul>
      </div>
      <div className="admin-page-footer">Admin panel v0.1 (c) MyStore</div>
    </div>
  );
};

export default AdminNavBar;
