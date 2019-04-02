import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import "assets/css/material-dashboard-react.css?v=1.5.0";
import indexRoutes from "routes/index.jsx";
import thunk from 'redux-thunk';
import FlashMessageList from './components/flash/FlashMessageList';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser } from "./components/actions/authActions";
import jwt from 'jsonwebtoken';


const hist = createBrowserHistory();

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
  )
);
if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}

ReactDOM.render(

  <Provider store={store}>
    <Router history={hist}>
      <div>
        <Switch>
          {indexRoutes.map((prop, key) => {
            return <Route path={prop.path} component={prop.component} key={key} />;
          })}
        </Switch>
        <FlashMessageList />
        {/* {this.props.children} */}
      </div>
    </Router>
  </Provider>
  ,
  document.getElementById("root")
);
