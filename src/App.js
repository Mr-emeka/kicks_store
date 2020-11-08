import React, { useEffect } from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import { userSession } from "./redux/auth/actions";
import RouteList from "./helpers/route-list";
import { selectCurrentUser } from "./redux/auth/selector";
// import { createStructuredSelector } from "reselect";
// import ErrorBoundary from "./component/custom/errorBoundaries";
const ViewHome = React.lazy(() => import("./component/views/Home"));
const Error = React.lazy(() => import("./component/views/Error"));
const SignUp = React.lazy(() => import("./component/views/SignUp"));
const Login = React.lazy(() => import("./component/views/Login"));
const Dash = React.lazy(() => import("./component/views/Admin/"));

const AuthRoute = ({ component: Component, authUser, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

function App({ userSession, currentUser }) {
  console.log(currentUser);

  useEffect(() => {
    userSession();
  }, [userSession]);

  return (
    <div className="h-100">
      <>
        <Router>
          <Switch>
            {/* <AuthRoute
                path={adminRoot}
                authUser={currentUser}
                component={ViewApp}
              /> */}
            <Route
              path={RouteList.home}
              exact
              render={(props) => <ViewHome {...props} />}
            />
            <Route path="/signup" render={(props) => <SignUp {...props} />} />
            <Route path="/login" render={(props) => <Login {...props} />} />
            <Route path="/admin" render={(props) => <Dash {...props} />} />
            <Route path="*" component={Error} />
            {/* <Redirect to={RouteList.error} /> */}
          </Switch>
        </Router>
      </>
    </div>
  );
}
const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
});
// const mapStateToProps = createStructuredSelector({
//   currentUser: selectCurrentUser,
// });

const mapDispatchToProps = (dispatch) => ({
  userSession: () => dispatch(userSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
