import React, { useState, useEffect } from "react";
import { Form, Button, Spinner, Row, Col } from "react-bootstrap";
import { scrape_twitter, scrape_twitter_location } from "../actions/scrape";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import countryname from "./cities.json";
import { Redirect } from "react-router";
import SideNav from "../components/SideNav";
import "../css/scrapper.css";
import img1 from "../images/scrapper-img.png";
import img2 from "../images/scrapper-img2.png";
import Message from "../components/message";
const TwitterScrapper = ({
  scrape_twitter,
  scrape_twitter_location,
  username,
  email,
  isAuthenticated,
  isAdmin,
  logout,

  scrapeDone,
  error,
  downloadFile,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [country, setCountry] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    search_word: "",
    tweetCount: "",
    start: "",
    end: "",
    radius: "",
  });
  const logoutHandler = () => {
    logout();
  };

  const checked = (e) => {
    const check = e.target.checked;
    setIsChecked(check);
  };
  const cities = (e) => {
    const country = e.target.value;
    setCountry(country);
  };
  const { search_word, tweetCount, start, end, radius } = formData;

  const findErrors = () => {
    const newErrors = {};

    //search word Error
    if (!search_word || search_word === "")
      newErrors.search_word = "search word is Required";
    else if (search_word.length > 30)
      newErrors.search_word = "search word is Too Long";

    //tweet count Error
    if (!tweetCount || tweetCount === "")
      newErrors.tweetCount = "Number of tweets is Required";
    else if (tweetCount > 2000)
      newErrors.tweetCount = "Number of tweets are not greater than 2000";
    else if (tweetCount < 1)
      newErrors.tweetCount = "Number of tweets can not be 0";

    //start date Error
    if (!start || start === "") newErrors.start = "Start Date is Required";

    //end date Error
    if (!end || end === "") newErrors.end = "End Date is Required";

    if (isChecked) {
      //Radius Error
      if (!radius || radius === "") newErrors.radius = "Radius is Required";
      else if (radius < 1) newErrors.radius = "Radius can not be 0";

      if (!country || country === "")
        newErrors.country = "Selecting country is Required";
    }
    return newErrors;
  };
  useEffect(() => {
    if (isLoading) {
      const newErrors = findErrors();
      if (Object.keys(newErrors).length > 0) {
        setIsLoading(false);
        // We got errors!
        setErrors(newErrors);
      } else {
        setIsLoading(true);
        setErrors({});
        if (isChecked) {
          scrape_twitter_location(
            search_word,
            tweetCount,
            start,
            end,
            radius,
            country,
            username,
            email
          ).then(() => {
            console.log(scrapeDone);
            setShow(true);
            // handlePDFDownload_twitter(search_word);
            setIsLoading(false);
          });
        } else {
          scrape_twitter(
            search_word,
            tweetCount,
            start,
            end,
            username,
            email
          ).then(() => {
            console.log(scrapeDone);
            setShow(true);
            // handlePDFDownload_twitter(search_word);
            setIsLoading(false);
          });
        }
      }
    }
  }, [isLoading]);
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    console.log(search_word, tweetCount, start, end);
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
      <section className="container content-scrapper">
        <div className="scrapper-intro">
          <h3>
            <u>TWITTER SCRAPPER</u>
          </h3>
          <p className="wrapper-text mt-3">
            The Web scrapper feature functions on the principle of data mining,
            scraping or data extraction. This Web Scrapper, Web Harvestor or Web
            Data Extractor allows you to retrieve Tweets amounting in the range
            of 1-2000. The extracted tweets will be aging from the range given.
            Enter the keyword on which you want to scrap the tweets. This
            feature acquires the username, user-followers, tweet text, location,
            retweet-count, hashtags, user-id etc of the twitterati and
            consolidate them in a single csv file, with respect to the
            particular word, topic, hashtag you have entered. That's it now you
            have several tweets synthesized into a single file on your desired
            topic without taking long.
          </p>
          <img src={img2} alt="" />
        </div>
        <div className="scrapper-search">
          <Form onSubmit={onSubmit}>
            <Row>
              <Col>
                <Form.Group className="mb-0" controlId="formGroupSearch">
                  <Form.Label>Search</Form.Label>
                  <Form.Control
                    name="search_word"
                    className={`input ${errors.search_word && "errorShow"}`}
                    type="text"
                    placeholder="Enter Query"
                    value={search_word || ""}
                    onChange={(e) => onChange(e)}
                  />
                  {errors.search_word && (
                    <p className="errorShow">{errors.search_word}</p>
                  )}
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-0" controlId="formGroupNumber">
                  <Form.Label>
                    Number of Tweets (Between Range 1-2000)
                  </Form.Label>
                  <Form.Control
                    name="tweetCount"
                    className={`input ${errors.tweetCount && "errorShow"}`}
                    type="text"
                    placeholder="Enter Number of tweets"
                    // minLength="11"
                    // minLength="11"
                    value={tweetCount || ""}
                    onChange={(e) => onChange(e)}
                  />
                  {errors.tweetCount && (
                    <p className="errorShow">{errors.tweetCount}</p>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-0 mt-3" controlId="formGroupDate">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    name="start"
                    className={`input ${errors.start && "errorShow"}`}
                    type="date"
                    placeholder="Enter Start Date"
                    value={start || ""}
                    onChange={(e) => onChange(e)}
                  />
                  {errors.start && <p className="errorShow">{errors.start}</p>}
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-0 mt-3" controlId="formGroupDate">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    name="end"
                    className={`input ${errors.end && "errorShow"}`}
                    type="date"
                    placeholder="Enter End Date"
                    value={end || ""}
                    onChange={(e) => onChange(e)}
                  />
                  {errors.end && <p className="errorShow">{errors.end}</p>}
                </Form.Group>
              </Col>
            </Row>
            <Form.Check
              aria-label="option 1"
              label="Scrape Through Location"
              onChange={(e) => checked(e)}
              className="mt-3 mb-3"
              disabled={isLoading}
            />
            {isChecked ? (
              <Row>
                <Col>
                  <Form.Group controlId="formBasicSelectOption">
                    <Form.Label>Select the Country</Form.Label>
                    <Form.Control
                      className={`input ${errors.country && "errorShow"} `}
                      name="country"
                      as="select"
                      value={country || ""}
                      onChange={(e) => cities(e)}
                    >
                      <option value="default">Select Country...</option>
                      {countryname.map((countryNames, index) => {
                        return <option key={index}>{countryNames}</option>;
                      })}
                    </Form.Control>
                    {errors.country && (
                      <p className="errorShow">{errors.country}</p>
                    )}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-0" controlId="formGroupNumber">
                    <Form.Label>Radius (in km)</Form.Label>
                    <Form.Control
                      name="radius"
                      className={`input ${errors.radius && "errorShow"}`}
                      type="text"
                      placeholder="Enter Radius (in Km)"
                      // minLength="11"
                      // minLength="11"
                      value={radius || ""}
                      onChange={(e) => onChange(e)}
                    />
                    {errors.radius && (
                      <p className="errorShow">{errors.radius}</p>
                    )}
                  </Form.Group>
                </Col>
              </Row>
            ) : (
              <></>
            )}
            {isLoading ? (
              <div className="justify-content">
                <p>
                  If your number of tweets is greater than 500 then it will take
                  2 or 3 minutes to scrape the data
                </p>
                {isChecked ? (
                  <p>
                    Only 1 or 2 % tweets are geo-tagged. If your are scrapping
                    through location it means it will take more time than usual
                    and it does not mean that all the tweets have location.
                  </p>
                ) : (
                  ""
                )}
                <br />
                <Button
                  variant="primary"
                  disabled
                  className="submit d-flex justify-content-center"
                >
                  <Spinner
                    as="span"
                    animation="border"
                    role="status"
                    aria-hidden="true"
                  />
                  Scrapping...
                </Button>
              </div>
            ) : (
              <div className="d-flex justify-content-center mt-5">
                <Button
                  as="input"
                  type="submit"
                  value={isLoading ? "Scrapping…" : "Scrape"}
                  className="submit d-flex justify-content-center pace-content-center"
                  disabled={isLoading}
                />
              </div>
            )}
          </Form>
          <div>
            {scrapeDone && (
              <Message
                title="Congratulations"
                message="Your file have been successfully created shortly."
                show={show}
                onHide={() => setShow(false)}
              />
            )}
          </div>
          <div>
            {error && (
              <Message
                title="Error"
                message="Error in scraping the data from the twitter."
                show={show}
                onHide={() => setShow(false)}
              />
            )}
          </div>
          <div>
            {downloadFile && (
              <Message
                title="Error"
                message="Error in downloading the File(s)."
                show={show}
                onHide={() => setShow(false)}
              />
            )}
          </div>
        </div>
        <div className="scrapper-work">
          <h3>HOW SCRAPPER WORKS?</h3>
          <p>
            <img
              src={img1}
              alt="Pineapple"
              // style={{width:'170px',height:'170px',marginLeft:'15px'}}
            />
            Seacrh the top trending topics on the twitter with a start and
            ending date of your choice and how many tweets you want to scrape in
            the range of 1-2000 but as the number of tweet increases the
            computation also increases and it will take more time to scrape the
            data.
            <br />
          </p>
        </div>
      </section>
    </>
  );
};
const mapStateToProps = (state) => ({
  username: state.auth.username,
  email: state.auth.email,
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin,
  scrapeDone: state.scrape.scrapeDone,
  error: state.scrape.error,
  downloadFile: state.scrape.downloadFile,
});

export default connect(mapStateToProps, {
  scrape_twitter,
  logout,
  scrape_twitter_location,
})(TwitterScrapper);
