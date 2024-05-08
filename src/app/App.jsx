import { Route, Switch } from "react-router-dom";

import UserLayout from "./layout/userLayout";
import AdminLayout from "./layout/admin/adminLayout";

import "./App.css";

const App = () => {
  return (
    <Switch>
      <Route path="/admin" component={AdminLayout} />
      <Route path="/" component={UserLayout} />
    </Switch>
  );
};

export default App;
