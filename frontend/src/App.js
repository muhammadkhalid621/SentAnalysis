import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
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
import TwitterScrapper from "./containers/TwitterScrapper";
import Models from "./containers/models";
import adminProfile from "./containers/adminProfile";
import LoadingUser from "./containers/loadingUser";
import { DashboardUser, DashboardUserPrediction, DashboardUserSupport } from "./clientSide/DashboardUser";
import FrontPage from "./containers/FrontPage";
import TrainModels from "./containers/TrainModels";
import Clients from "./containers/Clients";
import FacebookScrapper from "./containers/FacebookScrapper";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MainPage from "./containers/MainPage";
import Features from "./containers/Features";
import More from "./containers/More";
import Services from "./containers/Services";
import Home from "./containers/Home";
import "./App.css";
import GraphAnalysis from "./containers/GraphAnalysis";
import Accounts from "./containers/Accounts";
// import MainPage from "./MainPage/src/MainPage";
// import Features from "./MainPage/src/components/pages/Features/Features";
// import Services from "./MainPage/src/components/pages/Services/Services";
// import More from "./MainPage/src/components/pages/More/More";
// import Home from "./MainPage/src/components/pages/HomePage/Home";
// import Navbar from "./MainPage/src/components/Navbar";
// import Footer from "./MainPage/src/components/pages/Footer/Footer";

const App = withRouter(({ location }) => {
  return (
    <Layout>
      <Route exact path="/" component={FrontPage} />
      {(location.pathname !== "/" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/login" &&
        location.pathname !== "/loadingUser" &&
        location.pathname !== "/activate/:uid/:token" &&
        location.pathname !== "/dashboard" &&
        location.pathname !== "/userDashboard" &&
        location.pathname !== "/userDashboard/Prediction" &&
        location.pathname !== "/userDashboard/Support" &&
        location.pathname !== "/fbscrapper" &&
        location.pathname !== "/twitterscrapper" &&
        location.pathname !== "/models" &&
        location.pathname !== "/clients" &&
        location.pathname !== "/dashboard/graph-analysis" &&
        location.pathname !== "/dashboard/accounts" &&
        location.pathname !== "/train" &&
        location.pathname !== "/userDashboard" &&
        location.pathname !== "/reset-password" &&
        location.pathname !== "/password/reset/confirm/:uid/:token") && (
          <Navbar />
        )}
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/more" component={More} />
        <Route exact path="/features" component={Features} />
        <Route exact path="/services" component={Services} />
      </Switch>
      {(location.pathname !== "/" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/login" &&
        location.pathname !== "/loadingUser" &&
        location.pathname !== "/activate/:uid/:token" &&
        location.pathname !== "/dashboard" &&
        location.pathname !== "/userDashboard" &&
        location.pathname !== "/userDashboard/Prediction" &&
        location.pathname !== "/userDashboard/Support" &&
        location.pathname !== "/fbscrapper" &&
        location.pathname !== "/twitterscrapper" &&
        location.pathname !== "/models" &&
        location.pathname !== "/clients" &&
        location.pathname !== "/dashboard/graph-analysis" &&
        location.pathname !== "/train" &&
        location.pathname !== "/userDashboard" &&
        location.pathname !== "/dashboard/accounts" &&
        location.pathname !== "/reset-password" &&
        location.pathname !== "/password/reset/confirm/:uid/:token") && (
          <Footer />
        )}
      <Switch>
        {/* <Route exact path="/home" component={MainPage} /> */}

        <Route exact path="/signup" component={Signup} />
        <Route exact path="/activate/:uid/:token" component={Activate} />
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <ProtectedRoute exact path="/Profile" component={adminProfile} />
        <ProtectedRoute
          exact
          path="/twitterscrapper"
          component={TwitterScrapper}
        />
        <ProtectedRoute exact path="/fbscrapper" component={FacebookScrapper} />
        <ProtectedRoute exact path="/models" component={Models} />
        <ProtectedRoute exact path="/train" component={TrainModels} />
        <ProtectedRoute exact path="/userDashboard" component={DashboardUser} />
        <ProtectedRoute exact path="/userDashboard/Prediction" component={DashboardUserPrediction} />
        <ProtectedRoute exact path="/userDashboard/Support" component={DashboardUserSupport} />
        <ProtectedRoute exact path="/loadingUser" component={LoadingUser} />
        <ProtectedRoute exact path="/clients" component={Clients} />
        <ProtectedRoute exact path="/dashboard/accounts" component={Accounts} />
        <ProtectedRoute exact path="/dashboard/graph-analysis" component={GraphAnalysis} />
        <Route exact path="/reset-password" component={ResetPassword} />
        <Route
          exact
          path="/password/reset/confirm/:uid/:token"
          component={ResetPasswordConfirm}
        />
      </Switch>
    </Layout>
  );
});

export default App;
