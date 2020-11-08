import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";

const Dash = React.lazy(() => import("./Dashboard"));
const Product = React.lazy(() => import("./ViewProduct"));

const Admin = ({ match }) => {
  return (
    <AdminLayout>
      <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/dash`} />
        <Route
          path={`${match.url}/dash/`}
          exact
          render={(props) => <Dash {...props} />}
        />
        <Route
          path={`${match.url}/dash/product/:name/:id`}
          render={(props) => <Product {...props} />}
        />
        <Redirect to="/error" />
      </Switch>
    </AdminLayout>
  );
};

export default Admin;
