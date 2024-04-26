import { useDispatch, useSelector } from "react-redux";
import { getBasketEntities, openBasket } from "../../../store/basket";
import { useHistory } from "react-router-dom";

const CtrlPanel = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const basketEntities = useSelector(getBasketEntities());

  const handleClickOpenBasket = () => {
    document.body.classList.add("blocked");
    dispatch(openBasket());
  };

  const handleClickRoute = (path) => {
    history.push(path);
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
        <button className="btn-ctrl-panel btn-ctrl-panel-fav" onClick={() => handleClickRoute("/favourites")}>
          Избранное
        </button>
        <button className="btn-ctrl-panel btn-ctrl-panel-basket" onClick={handleClickOpenBasket}>
          {basketEntities.length !== 0 && <span className="basket-product-count">{basketEntities.length}</span>}
          Корзина
        </button>
        <button className="btn-ctrl-panel btn-ctrl-panel-login" onClick={() => handleClickRoute("/login")}>
          Войти
        </button>
      </div>
    </div>
  );
};

export default CtrlPanel;
