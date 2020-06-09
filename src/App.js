import React, { Component, Fragment } from "react";
import "./App.css";
import { Provider } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import store from "./store";
import "./theme.css";
import { loadUser } from "./actions/auth";
import Login from "./components/Login";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Alerts from "./components/Alerts";
import Signup from "./components/Signup";
import PrivateRoute from "./components/utils/PrivateRoute";
import News from "./components/News";
import CreateNewCategory from "./components/CreateNewCategory";
import Categories from "./components/Categories";
import NewsDetails from "./components/NewsDetails";
import CreateNews from "./components/CreateNews";

const alertOptions = {
  timeout: 3000,
  position: "top right",
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <div className="application">
                <Header />
                <Alerts />
                <div className="container">
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <PrivateRoute exact path="/news" component={News} />
                    <PrivateRoute path={"/showNews/:id"} component={NewsDetails} />
                    <PrivateRoute exact path="/createCategory" component={CreateNewCategory} />
                    <PrivateRoute exact path="/categories" component={Categories} />
                    <PrivateRoute exact path="/createNews" component={CreateNews} />
                    <Route exact path="/signin" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                  </Switch>
                </div>
              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

export default App;
