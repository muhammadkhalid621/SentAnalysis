import "../css/Home.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
// import Home from './Home/Home';
import Footer from "./Home/Footer";
import Features from "./Features";
import More from "./More";
import Services from "./Services";
import Home from "./Home";
// import More from './Home/More';
// import Features from './Home/Features';
// import Services from './Home/Services';

// import Login from './components/pages/Login/Login';
// import GetStarted from './components/pages/GetStarted/GetStarted';

const MainPage = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/home" element={<Home />} exact />
        <Route path="/more" element={<More />} />
        <Route path="/features" element={<Features />} />
        <Route path="/services" element={<Services />} />
      </Switch>
      <Footer />
    </Router>

    // <Router>
    //   <Navbar />
    //   <Switch>
    //     <Route path='/home' element={Home} exact/>
    //     <Route path='/more' element={More} />
    //     <Route path='/features' element={Features} />
    //     <Route path='/services' element={Services} />
    //   </Switch>
    //   <Footer />
    // </Router>
  );
};

export default MainPage;
