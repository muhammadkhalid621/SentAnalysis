import React, { useState, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { scrape_twitter } from "../actions/scrape";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import { Redirect } from "react-router";
import SideNav from "../components/SideNav";
import "../css/models.css";

const Scrapper = ({
  scrape_twitter,
  username,
  email,
  isAuthenticated,
  isAdmin,
  logout,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    search_word: "",
  });
  const logoutHandler = () => {
    logout();
  };
  const { search_word } = formData;
  useEffect(() => {
    if (isLoading) {
      scrape_twitter(search_word, username, email).then(() => {
        setIsLoading(false);
      });
    }
  }, [isLoading]);
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    setIsLoading(true)
    e.preventDefault();
    console.log(search_word);
    // scrape_twitter(search_word, username, email);
    
  };

  // if (!isAuthenticated) {
  //   logoutHandler();
  //   return <Redirect to="/login" />;
  // }
  // if (!isAdmin) {
  //   logoutHandler();
  //   return <Redirect to="/login" />;
  // }
  return (
    <>
      <SideNav />
      <div className="content">
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-0" controlId="formGroupSearch">
            <Form.Label>Search</Form.Label>
            <Form.Control
              name="search_word"
              //   className={`input ${errors.password && "errorShow"}`}
              type="text"
              placeholder="Enter Query"
              value={search_word || ""}
              onChange={(e) => onChange(e)}
              required
            />
            {/* {errors.password && (
                  <p className="errorShow">{errors.password}</p>
                )} */}
          </Form.Group>
          <div className="d-flex justify-content-center">
            {isLoading ? (
              <Button variant="primary" disabled className="submit">
                <Spinner
                  as="span"
                  animation="border"
                  role="status"
                  aria-hidden="true"
                />
                Scrapping...
              </Button>
            ) : (
              <Button
                as="input"
                type="submit"
                value={isLoading ? 'Scrapping…' : 'Scrape'}
                className="submit"
                disabled={isLoading}
             
              />
              )}
          </div>
        </Form>
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  username: state.auth.username,
  email: state.auth.email,
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin,
});

export default connect(mapStateToProps, { scrape_twitter, logout })(Scrapper);
