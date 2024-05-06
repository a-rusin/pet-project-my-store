import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-wrapper">
        <h2 className="footer-text">STORE.COM © 2024</h2>
        <ul className="icons-list">
          <li className="icon-item icon-item-vk"></li>
          <li className="icon-item icon-item-tg"></li>
        </ul>
        <ul className="footer-list">
          <li className="footer-item">
            <Link to="/" className="footer-item-url">
              Главная
            </Link>
          </li>
          <li className="footer-item">
            <Link to="/news" className="footer-item-url">
              Новости
            </Link>
          </li>
          <li className="footer-item">
            <Link to="/stocks" className="footer-item-url">
              Акции
            </Link>
          </li>
          <li className="footer-item">
            <Link to="/contacts" className="footer-item-url">
              Контакты
            </Link>
          </li>
          <li className="footer-item">
            <Link to="/feedback" className="footer-item-url">
              Обратная связь
            </Link>
          </li>
          <li className="footer-item">
            <Link to="/about" className="footer-item-url">
              О нас
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
