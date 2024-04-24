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
import { loadProductsList } from "./store/products";
import { useEffect } from "react";
import Login from "./layout/login";
import { loadCategoriesList } from "./store/categories";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProductsList());
    dispatch(loadCategoriesList());
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
