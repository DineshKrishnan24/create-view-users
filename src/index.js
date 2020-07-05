import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import UserDetails from "./component/UserDetails";
import ViewPage from "./component/ViewPage";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/" exact component={UserDetails} />
        <Route path="/view-all" exact component={ViewPage} />
        <Route path="/user/:userId" component={UserDetails} />
      </Router>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
