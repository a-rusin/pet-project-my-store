import { useDispatch } from "react-redux";
import { openBasket } from "../../../store/basket";

const CtrlPanel = () => {
  const dispatch = useDispatch();

  const handleClickOpenBasket = () => {
    dispatch(openBasket());
  };

  return (
    <div className="ctrl-panel">
      <div className="ctrl-panel-wrapper">
        <h1 className="store-name-title">STORE.COM</h1>
        <form className="search-form">
          <div className="search-form-wrapper">
            <input type="text" placeholder="Поиск по сайту" className="search-form-input" />
            <button type="submit" className="search-form-btn">
              Найти
            </button>
          </div>
        </form>
        <button className="btn-ctrl-panel btn-ctrl-panel-fav">Избранное</button>
        <button className="btn-ctrl-panel btn-ctrl-panel-basket" onClick={handleClickOpenBasket}>
          Корзина
        </button>
        <button className="btn-ctrl-panel btn-ctrl-panel-login">Войти</button>
      </div>
    </div>
  );
};

export default CtrlPanel;
