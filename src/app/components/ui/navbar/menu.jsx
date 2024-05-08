import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getContacts, getContactsLoadingStatus } from "../../../store/contacts";
import LoaderSpinner from "../../common/loaderSpinner";
import Loader from "../../common/loader";

const Menu = () => {
  const isLoadingContacts = useSelector(getContactsLoadingStatus());
  const contacts = useSelector(getContacts());

  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-item-url">
            Главная
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/news" className="nav-item-url">
            Новости
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
      <div className="phone">{isLoadingContacts ? <Loader height={8} /> : contacts.phone}</div>
    </nav>
  );
};

export default Menu;
