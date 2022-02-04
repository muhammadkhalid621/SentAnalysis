import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Signup from "./containers/Signup";
import Activate from "./containers/Activate";
import Login from "./containers/Login";
import Dashboard from "./containers/Dashboard";
import Layout from "./hocs/Layout";
import ResetPassword from "./containers/ResetPassword";
import ResetPasswordConfirm from "./containers/ResetPasswordConfirm";
import ProtectedRoute from "./ProtectedRoute";
import Scrapper from "./containers/Scrapper";
import Models from "./containers/models";
import adminProfile from "./containers/adminProfile";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/activate/:uid/:token" component={Activate} />
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            <ProtectedRoute exact path="/Profile" component={adminProfile} />
            <ProtectedRoute exact path="/scrapper" component={Scrapper} />
            <ProtectedRoute exact path="/models" component={Models} />
            <Route exact path="/reset-password" component={ResetPassword} />
            <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />
          </Switch>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
