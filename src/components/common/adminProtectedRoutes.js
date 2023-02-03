import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router";

const AdminProtectedRoutes = ({
  state,
  path,
  component: Component,
  render,
  ...rest
}) => {
    function alertfunction(){
        alert("Only Admin / Staff are allowed to this page.")
    }
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (!state.isAuthenticated)
            if(state.user == null || !state.user.isAdmin)
          return (
            <>
            {alertfunction}
                <Redirect
                to={{
                    pathname: "/",
                    state: { from: props.location },
                }}
                />
            </>
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};
const mapStateToProps = (state) => ({
  state: state,
});
export default connect(mapStateToProps, null)(AdminProtectedRoutes);
