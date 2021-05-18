import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import React from "react";
import Login from "../components/Login/Login";
// import Register from "../components/Register/Register";
import Home from "../components/HomePage/Home";
import DashboardRoutes from "./DashboardRoutes";
import Page404 from "../components/widgets/Page404";

const AppRouter = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />

          <Route path="/home" exact component={Home} />

          <Route path="/" component={DashboardRoutes} />
          <Route path="*" exact={true} component={Page404} />
        </Switch>
      </Router>
    </>
  );
};

export default AppRouter;
