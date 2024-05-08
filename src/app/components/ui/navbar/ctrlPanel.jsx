import { useDispatch, useSelector } from "react-redux";
import { getBasketEntities, openBasket } from "../../../store/basket";
import { useHistory } from "react-router-dom";
import { getCurrentUser, getIsAuthLoading } from "../../../store/auth";
import UserMenu from "./userMenu";
import { useEffect, useState } from "react";
import LoaderSpinner from "../../common/loaderSpinner";
import { getFavouritesProductsList } from "../../../store/favourites";

const CtrlPanel = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const isAuthLoading = useSelector(getIsAuthLoading());

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const [searchInput, setSearchInput] = useState("");

  const currentUser = useSelector(getCurrentUser());

  const basketEntities = useSelector(getBasketEntities());

  const favouritesEntities = useSelector(getFavouritesProductsList());

  const handleClickOpenBasket = () => {
    document.body.classList.add("blocked");
    dispatch(openBasket());
  };

  const handleClickRoute = (path) => {
    history.push(path);
  };

  useEffect(() => {
    document.body.addEventListener("click", () => {
      setIsUserMenuOpen(false);
    });
  });

  const toggleUserMenu = (e) => {
    e.stopPropagation();
    setIsUserMenuOpen((prevState) => !prevState);
  };

  const hadleSubmitSearch = (e) => {
    e.preventDefault();
    history.push(`/search?text=${searchInput}`);
    setSearchInput("");
  };

  return (
    <div className="ctrl-panel">
      <div className="ctrl-panel-wrapper">
        <h1 className="store-name-title">STORE.COM</h1>
        <form className="search-form" onSubmit={hadleSubmitSearch}>
          <div className="search-form-wrapper">
            <input
              type="text"
              placeholder="Поиск по сайту"
              className="search-form-input"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit" className="search-form-btn">
              Найти
            </button>
          </div>
        </form>
        <div className="ctrl-panel-btn-groups">
          <button className="btn-ctrl-panel btn-ctrl-panel-fav" onClick={() => handleClickRoute("/favourites")}>
            {favouritesEntities.length !== 0 && <span className="basket-product-count">{favouritesEntities.length}</span>}
            Избранное
          </button>
          <button className="btn-ctrl-panel btn-ctrl-panel-basket" onClick={handleClickOpenBasket}>
            {basketEntities.length !== 0 && <span className="basket-product-count">{basketEntities.length}</span>}
            Корзина
          </button>
          {currentUser ? (
            <div className="user-panel">
              <button className="btn-ctrl-panel btn-ctrl-panel-user" onClick={(e) => toggleUserMenu(e)}>
                {currentUser.name}
              </button>
              <UserMenu isUserMenuOpen={isUserMenuOpen} />
            </div>
          ) : (
            <button
              className={"btn-ctrl-panel btn-ctrl-panel-login" + (isAuthLoading ? "-process" : "")}
              onClick={() => handleClickRoute("/login")}
              disabled={isAuthLoading}
            >
              {isAuthLoading && <LoaderSpinner />}

              {isAuthLoading ? "Вход..." : "Войти"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CtrlPanel;
