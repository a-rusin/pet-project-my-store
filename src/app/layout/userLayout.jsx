import { Redirect, Route } from "react-router-dom";
import Navbar from "../components/ui/navbar/navbar";
import Products from "./products";
import Product from "./product";
import ProductsSearch from "./productsSearch";
import Favourites from "./favourites";
import News from "./news";
import Stocks from "./stocks";
import Contacts from "./contacts";
import Feedback from "./feedback";
import About from "./about";
import Login from "./login";
import NotFound from "./notFound";
import Footer from "../components/ui/footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadCategoriesList } from "../store/categories";
import localStorageService from "../services/localStorage.service";
import localStorageConstants from "../constants/localStorage.constants";
import { getProductsInfo } from "../store/favourites";
import { getUser, stopLoading } from "../store/auth";

const UserLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCategoriesList());

    const favouritesLS =
      localStorageService.get(localStorageConstants.favourites) || [];

    if (favouritesLS !== 0) {
      dispatch(getProductsInfo(favouritesLS));
    }

    const isTokenLS = localStorageService.get(localStorageConstants.token);
    const isUserIdLS = localStorageService.get(localStorageConstants.userId);

    if (isTokenLS && isUserIdLS) {
      dispatch(getUser(isUserIdLS));
    } else {
      dispatch(stopLoading());
    }
  }, []);

  return (
    <div className="page-result">
      <div className="main-wrapper">
        <main className="page">
          <div className="container">
            <Navbar />
            <Route path="/" exact component={Products} />
            <Route path="/products/item/:productId" exact component={Product} />
            <Route
              path="/products/:productsCategory?"
              exact
              component={Products}
            />
            <Route path="/search" exact component={ProductsSearch} />
            <Route path="/favourites" exact component={Favourites} />
            <Route path="/news" exact component={News} />
            <Route path="/stocks" exact component={Stocks} />
            <Route path="/contacts" exact component={Contacts} />
            <Route path="/feedback" exact component={Feedback} />
            <Route path="/about" exact component={About} />
            <Route path="/login" exact component={Login} />
            <Route path="/404" exact component={NotFound} />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default UserLayout;
