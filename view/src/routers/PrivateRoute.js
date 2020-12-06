import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Header from "../components/common/Header";
import { ROUTE_CONSTANTS } from "../utils/app-constants";

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={(props) =>
      isAuthenticated ? (
        <div>
          <Header></Header>
          <div className="container">
            <Component {...props} />
          </div>
        </div>
      ) : (
        <Redirect to={ROUTE_CONSTANTS.LOGIN} />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(PrivateRoute);
