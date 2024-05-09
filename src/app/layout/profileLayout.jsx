import { Link, NavLink, Redirect, Route } from "react-router-dom";
import ProfileOrdersPage from "../components/pages/profileOrdersPage";
import ProfilePage from "../components/pages/profilePage";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, getIsAuthLoading } from "../store/auth";
import Loader from "../components/common/loader";

const ProfileLayout = () => {
  const dispatch = useDispatch();

  const isUserLoading = useSelector(getIsAuthLoading());
  const currentUser = useSelector(getCurrentUser());

  if (isUserLoading) {
    return (
      <div className="profile">
        <h1 className="page-title">Личный кабинет</h1>
        <div className="page-wrapper">
          <Loader />
        </div>
      </div>
    );
  } else if (currentUser) {
    return (
      <div className="profile">
        <h1 className="page-title">Личный кабинет</h1>
        <div className="page-wrapper">
          <nav className="profile-nav">
            <ul className="profile-list">
              <li className="profile-list-item">
                <NavLink exact to="/profile" className="profile-list-item-url">
                  Настройка профиля
                </NavLink>
              </li>
              <li className="profile-list-item active">
                <NavLink exact to="/profile/orders" className="profile-list-item-url">
                  История заказов
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="profile-content">
            <Route path="/profile/orders" exact component={ProfileOrdersPage} />
            <Route path="/profile" exact component={ProfilePage} />
          </div>
        </div>
      </div>
    );
  } else {
    return <Redirect to="" />;
  }
};

export default ProfileLayout;
