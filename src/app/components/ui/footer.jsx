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
            <a href="main.html" className="footer-item-url">
              Главная
            </a>
          </li>
          <li className="footer-item">
            <a href="main.html" className="footer-item-url">
              Новости
            </a>
          </li>
          <li className="footer-item">
            <a href="main.html" className="footer-item-url">
              Акции
            </a>
          </li>
          <li className="footer-item">
            <a href="main.html" className="footer-item-url">
              Контакты
            </a>
          </li>
          <li className="footer-item">
            <a href="main.html" className="footer-item-url">
              Обратная связь
            </a>
          </li>
          <li className="footer-item">
            <a href="main.html" className="footer-item-url">
              О нас
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
