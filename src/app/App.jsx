import { useDispatch, useSelector } from "react-redux";

import { Redirect, Route, Switch } from "react-router-dom";

import Product from "./layout/product";
import Products from "./layout/products";
import Footer from "./components/ui/footer";
import Navbar from "./components/ui/navbar/navbar";

import "./App.css";
import News from "./layout/news";
import Stocks from "./layout/stocks";
import Contacts from "./layout/contacts";
import Feedback from "./layout/feedback";
import About from "./layout/about";
import NotFound from "./layout/notFound";
import { useEffect } from "react";
import Login from "./layout/login";
import { loadCategoriesList } from "./store/categories";
import Favourites from "./layout/favourites";
import localStorageService from "./services/localStorage.service";
import localStorageConstants from "./constants/localStorage.constants";
import { getProductsInfo } from "./store/favourites";
import { getUser } from "./store/auth";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCategoriesList());

    const favouritesLS = localStorageService.get(localStorageConstants.favourites) || [];

    if (favouritesLS !== 0) {
      dispatch(getProductsInfo(favouritesLS));
    }

    const isTokenLS = localStorageService.get(localStorageConstants.token);
    const isUserIdLS = localStorageService.get(localStorageConstants.userId);

    if (isTokenLS && isUserIdLS) {
      dispatch(getUser(isUserIdLS));
    }
  }, []);

  return (
    <div className="page-result">
      <div className="main-wrapper">
        <Navbar />
        <main className="page">
          <div className="container">
            <Switch>
              <Route path="/" exact component={Products} />
              <Route path="/products/item/:productId" component={Product} />
              <Route path="/products/:productsCategory?" component={Products} />
              <Route path="/favourites" component={Favourites} />
              <Route path="/news" component={News} />
              <Route path="/stocks" component={Stocks} />
              <Route path="/contacts" component={Contacts} />
              <Route path="/feedback" component={Feedback} />
              <Route path="/about" component={About} />
              <Route path="/login" component={Login} />
              <Route path="/404" component={NotFound} />
              <Redirect to="/404" />
            </Switch>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;
