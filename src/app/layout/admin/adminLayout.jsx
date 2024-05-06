import { useDispatch, useSelector } from "react-redux";
import {
  getIsAuthLoading,
  getUser,
  isRoleIncluded,
  stopLoading,
} from "../../store/auth";
import { Redirect, Route } from "react-router-dom";
import AdminNavBar from "../../components/ui/adminNavBar";
import AdminCategories from "./adminCategories";
import AdminMain from "./adminMain";
import AdminProducts from "./adminProducts";
import AdminUsers from "./adminUsers";
import AdminSlider from "./adminSlider";
import AdminOrders from "./adminOrders";
import AdminFeedback from "./adminFeedback";
import AdminSettingsGeneral from "./adminSettingsGenaral";
import { useEffect, useState } from "react";
import localStorageService from "../../services/localStorage.service";
import localStorageConstants from "../../constants/localStorage.constants";

const AdminLayout = () => {
  const dispatch = useDispatch();

  const isAuthLoading = useSelector(getIsAuthLoading());

  useEffect(() => {
    const isTokenLS = localStorageService.get(localStorageConstants.token);
    const isUserIdLS = localStorageService.get(localStorageConstants.userId);

    if (isTokenLS && isUserIdLS) {
      dispatch(getUser(isUserIdLS));
    } else {
      dispatch(stopLoading());
    }
  }, []);

  const isAdmin = useSelector(isRoleIncluded("ADMIN"));

  if (isAuthLoading) {
    document.title = "Загрузка...";
    return "Загрузка...";
  } else if (isAdmin) {
    document.title = "Админ панель v0.1 | MyStore.com";
    return (
      <div className="admin-page-wrapper">
        <AdminNavBar />
        <div className="admin-page-main-content">
          <Route path="/admin" exact component={AdminMain} />
          <Route path="/admin/categories" exact component={AdminCategories} />
          <Route path="/admin/products" exact component={AdminProducts} />
          <Route path="/admin/users" exact component={AdminUsers} />
          <Route path="/admin/slider" exact component={AdminSlider} />
          <Route path="/admin/orders" exact component={AdminOrders} />
          <Route path="/admin/feedback" exact component={AdminFeedback} />
          <Route
            path="/admin/settings"
            exact
            component={AdminSettingsGeneral}
          />
        </div>
      </div>
    );
  } else {
    return <Redirect to="" />;
  }
};

export default AdminLayout;
