import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/products" className="nav-item-url">
            Главная
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/news" className="nav-item-url">
            Новости
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/stocks" className="nav-item-url">
            Акции
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/contacts" className="nav-item-url">
            Контакты
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/feedback" className="nav-item-url">
            Обратная связь
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-item-url">
            О нас
          </Link>
        </li>
      </ul>
      <div className="phone">8 (999) 999-99-99</div>
    </nav>
  );
};

export default Menu;
