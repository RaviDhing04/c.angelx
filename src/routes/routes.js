import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import Loadable from "react-loadable";
import { connect } from "react-redux";

const LoadingFallback = props => {
  if (props.error) {
    console.log(props.error);
  }
  return null;
};

const AsyncHome = Loadable({
  loader: () =>
    import(/* webpackChunkName: "PageSwitcher" */ "../pages/Home/Home"),
  loading: error => <LoadingFallback {...error} />,
  modules: ["HomePage"]
});

const AsyncTemp = Loadable({
    loader: () =>
      import(/* webpackChunkName: "PageSwitcher" */ "../components/Banner/Banner"),
    loading: error => <LoadingFallback {...error} />,
    modules: ["HomePage"]
  });

export const parent_routes = [
  {
    path: "/",
    component: AsyncHome,
    exact: true
  }
];

export const child_routes = [
    {
        path: "/",
        component: AsyncTemp,
        exact: true
      },
    {
      path: "/home/abc",
      component: AsyncTemp,
      exact: true
    }
  ];

class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
      const {routes} = this.props;
    return (
      <>
        
          {/* <Route path="/" component={AsyncHome} key="/home" exact /> */}
          {routes.map((r, i) => (
            <Route path={r.path} component={r.component} key={i} />
          ))}
        {/* </Switch> */}
      </>
    );
  }
}

export default withRouter(connect()(Router));
