import React from "react";
import HomePage from "../components/common/Home";
import NotFoundPage from "../components/common/NotFoundPage";
import PublicRoute from "./PublicRoute";
import { createBrowserHistory } from "history";
import { Route, Switch, Router } from "react-router-dom";
import LoginPage from "../components/common/Login";
import PrivateRoute from "./PrivateRoute";
//import Registration from "../components/employee-management/Registration";
import { ROUTE_CONSTANTS } from "../utils/app-constants";
import EmployeesReporting from "../components/employees-management/EmployeesReporting";

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute
          path={ROUTE_CONSTANTS.LOGIN}
          component={LoginPage}
          exact={true}
        />
        <PrivateRoute
          path={ROUTE_CONSTANTS.HOME}
          component={HomePage}
          exact={true}
        />
        {/* <PrivateRoute
          path={ROUTE_CONSTANTS.REGISTER_EMPLOYEE}
          component={Registration}
          exact={true}
        /> */}
        <PrivateRoute
          path={ROUTE_CONSTANTS.VIEW_EMPLOYEES}
          component={EmployeesReporting}
          exact={true}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
