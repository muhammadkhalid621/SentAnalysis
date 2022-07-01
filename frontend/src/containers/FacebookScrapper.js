import React, { useState, useEffect } from "react";
import { Form, Button, Spinner, Row, Col } from "react-bootstrap";
import {
  scrape_facebook_page,
  scrape_facebook_post,
  scrape_facebook_comments,
  scrape_facebook_group,
} from "../actions/scrape";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import countryname from "./cities.json";
import { Redirect } from "react-router";
import SideNav from "../components/SideNav";
import "../css/scrapper.css";
import img1 from "../images/scrapper-img.png";
import img2 from "../images/scrapper-img2.png";
import Message from "../components/message";
const FacebookScrapper = ({
  scrape_facebook_page,
  scrape_facebook_post,
  scrape_facebook_comments,
  scrape_facebook_group,
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
  const [isPost, setIsPost] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [isGroup, setIsGroup] = useState(false);
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    page_name: "",
    PostCount_page: "",
    url_post: "",
    url_comments: "",
    group_name: "",
    PostCount_group: "",
  });
  const isPage = !isPost && !isComment && !isGroup;
  const logoutHandler = () => {
    logout();
  };

  const post = (e) => {
    const post = e.target.checked;
    setIsPost(post);
  };
  const comment = (e) => {
    const comment = e.target.checked;
    setIsComment(comment);
  };
  const group = (e) => {
    const group = e.target.checked;
    setIsGroup(group);
  };

  const {
    page_name,
    PostCount_page,
    url_post,
    url_comments,
    group_name,
    PostCount_group,
  } = formData;

  const findErrors = () => {
    const newErrors = {};

    if (isPage) {
      //Page Name Error
      if (!page_name || page_name === "")
        newErrors.page_name = "Page Name is Required";

      //page count Error
      if (!PostCount_page || PostCount_page === "")
        newErrors.PostCount_page = "Number of Post is Required";
      else if (PostCount_page > 20)
        newErrors.PostCount_page = "Number of Post are not greater than 2000";
      else if (PostCount_page < 1)
        newErrors.PostCount_page = "Number of Post can not be 0";
    }

    if (isPost) {
      //Url Error
      if (!url_post || url_post === "") newErrors.url_post = "URL is Required";
    }

    if (isComment) {
      //Url Error
      if (!url_comments || url_comments === "")
        newErrors.url_comments = "URL is Required";
    }

    if (isGroup) {
      //Group Name
      if (!group_name || group_name === "")
        newErrors.group_name = "Group Name is Required";

      //page count Error
      if (!PostCount_group || PostCount_group === "")
        newErrors.PostCount_group = "Number of Post is Required";
      else if (PostCount_group > 20)
        newErrors.PostCount_group = "Number of Post are not greater than 2000";
      else if (PostCount_group < 1)
        newErrors.PostCount_group = "Number of Post can not be 0";
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
        if (isPage) {
          scrape_facebook_page(page_name, PostCount_page, username, email).then(
            () => {
              console.log(scrapeDone);
              setShow(true);
              setIsLoading(false);
            }
          );
        }
        if (isPost) {
          scrape_facebook_post(url_post, username, email).then(() => {
            setShow(true);
            // const b = url_post.split("/");
            // handlePDFDownload_facebook(url_comments.split("/")[b.length - 1]);
            setIsLoading(false);
            setFormData({});
          });
        }
        if (isComment) {
          scrape_facebook_comments(url_comments, username, email).then(() => {
            setIsLoading(false);
            setFormData({});
          });
        }
        if (isGroup) {
          scrape_facebook_group(
            group_name,
            PostCount_group,
            username,
            email
          ).then(() => {
            setShow(true);
            setFormData({});
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
    console.log(
      page_name,
      PostCount_page,
      url_post,
      url_comments,
      group_name,
      PostCount_group
    );
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
            <u>FACEBOOK SCRAPPER</u>
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
            {isPage ? (
              <Row>
                <Col>
                  <Form.Group className="mb-0" controlId="formGroupPageName">
                    <Form.Label>Page Name</Form.Label>
                    <Form.Control
                      name="page_name"
                      className={`input ${errors.page_name && "errorShow"}`}
                      type="text"
                      placeholder="Enter Page Name"
                      value={page_name || ""}
                      onChange={(e) => onChange(e)}
                    />
                    {errors.page_name && (
                      <p className="errorShow">{errors.page_name}</p>
                    )}
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="mb-0" controlId="formGroupPostCount">
                    <Form.Label>Number of Post (Between Range 1-20)</Form.Label>
                    <Form.Control
                      name="PostCount_page"
                      className={`input ${
                        errors.PostCount_page && "errorShow"
                      }`}
                      type="text"
                      placeholder="Enter Number of Page"
                      // minLength="11"
                      // minLength="11"
                      value={PostCount_page || ""}
                      onChange={(e) => onChange(e)}
                    />
                    {errors.PostCount_page && (
                      <p className="errorShow">{errors.PostCount_page}</p>
                    )}
                  </Form.Group>
                </Col>
              </Row>
            ) : (
              <></>
            )}
            {isPost ? (
              <Form.Group controlId="formGroupURL">
                <Form.Label>Post URL</Form.Label>
                <Form.Control
                  className={`input ${errors.url_post && "errorShow"} `}
                  name="url_post"
                  placeholder="Enter the Post URL"
                  value={url_post || ""}
                  onChange={(e) => onChange(e)}
                ></Form.Control>
                {errors.url_post && (
                  <p className="errorShow">{errors.url_post}</p>
                )}
              </Form.Group>
            ) : (
              <></>
            )}

            {isComment ? (
              <Form.Group controlId="formGroupURL">
                <Form.Label>Post URL</Form.Label>
                <Form.Control
                  className={`input ${errors.url_comments && "errorShow"} `}
                  name="url_comments"
                  placeholder="Enter the Post URL"
                  value={url_comments || ""}
                  onChange={(e) => onChange(e)}
                ></Form.Control>
                {errors.url_comments && (
                  <p className="errorShow">{errors.url_comments}</p>
                )}
              </Form.Group>
            ) : (
              <></>
            )}

            {isGroup ? (
              <Row>
                <Col>
                  <Form.Group className="mb-0" controlId="formGroupGroupName">
                    <Form.Label>Group Name</Form.Label>
                    <Form.Control
                      name="group_name"
                      className={`input ${errors.group_name && "errorShow"}`}
                      type="text"
                      placeholder="Enter Group Name"
                      value={group_name || ""}
                      onChange={(e) => onChange(e)}
                    />
                    {errors.group_name && (
                      <p className="errorShow">{errors.group_name}</p>
                    )}
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="mb-0" controlId="formGroupPostCount">
                    <Form.Label>Number of Post (Between Range 1-20)</Form.Label>
                    <Form.Control
                      name="PostCount_group"
                      className={`input ${
                        errors.PostCount_group && "errorShow"
                      }`}
                      type="text"
                      placeholder="Enter Number of Page"
                      // minLength="11"
                      // minLength="11"
                      value={PostCount_group || ""}
                      onChange={(e) => onChange(e)}
                    />
                    {errors.PostCount_group && (
                      <p className="errorShow">{errors.PostCount_group}</p>
                    )}
                  </Form.Group>
                </Col>
              </Row>
            ) : (
              <></>
            )}
            <Form.Check
              aria-label="option 1"
              label="Scrape Post"
              onChange={(e) => post(e)}
              className="mt-3 mb-3"
              disabled={isLoading || isComment || isGroup}
            />
            <Form.Check
              aria-label="option 2"
              label="Scrape Comments"
              onChange={(e) => comment(e)}
              className="mt-3 mb-3"
              disabled={isLoading || isPost || isGroup}
            />
            <Form.Check
              aria-label="option 3"
              label="Scrape Group"
              onChange={(e) => group(e)}
              className="mt-3 mb-3"
              disabled={isLoading || isPost || isComment}
            />

            {isLoading ? (
              <div className="justify-content">
                <p>
                  It will take few minutes to scrape the data from the facebook.
                </p>
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
                message="Error in scraping the data from the facebook."
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
  scrape_facebook_page,
  scrape_facebook_post,
  scrape_facebook_comments,
  scrape_facebook_group,
  logout,
})(FacebookScrapper);
