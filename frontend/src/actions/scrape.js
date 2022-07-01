import axios from "axios";
// import React, { useState } from "react";
import {
  TWITTER_SCRAPE_SUCCESS,
  TWITTER_SCRAPE_FAIL,
  FACEBOOK_SCRAPE_SUCCESS,
  FACEBOOK_SCRAPE_FAIL,
  FILE_DOWLOAD_SUCCESS,
  FILE_DOWLOAD_FAIL,
} from "../actions/types";
import Message from "../components/message";

var fileDownload = require("js-file-download");

export const scrape_twitter =
  (search_word, tweetCount, start, end, username, email) =>
  async (dispatch) => {
    if (localStorage.getItem("access")) {
      // const [show, setShow] = useState(false);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };

      const body = JSON.stringify({
        search_word: search_word,
        tweetCount: tweetCount,
        start: start,
        end: end,
        username: username,
        email: email,
      });
      console.log("body", body);
      try {
        const res = await axios.post(
          "/scrappers/twitter_scrapper/",
          body,
          config
        );
        console.log("hello", res.data);
        const csvData = JSON.parse(JSON.stringify(res.data));
        fileDownload(csvData["scrapper"], search_word + ".csv");
        // setShow(true);

        dispatch({
          type: TWITTER_SCRAPE_SUCCESS,
          payload: {
            data: csvData["data"],
          },
        });

        // handlePDFDownload(search_word);

        // alert("Your file have been successfully created. ");
        // return (
        //   <Message
        //     title="Congratulations"
        //     message="Your file have been successfully created."
        //     show={true}
        //     onHide={false}
        //   />
        // );
      } catch (error) {
        const b = JSON.stringify(error.response.data, null, 2);
        dispatch({
          type: TWITTER_SCRAPE_FAIL,
          payload: JSON.parse(b),
        });
        // const a = JSON.stringify(error.response.data, null, 2);
        // // console.log(JSON.parse(a))
        // const search = JSON.parse(a);
        // if (search) alert("Error in scraping the data from the twitter");
      }
    } else {
      dispatch({
        type: TWITTER_SCRAPE_FAIL,
      });
    }
  };

export const scrape_twitter_location =
  (search_word, tweetCount, start, end, radius, location, username, email) =>
  async (dispatch) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };

      const body = JSON.stringify({
        search_word: search_word,
        tweetCount: tweetCount,
        start: start,
        end: end,
        username: username,
        email: email,
        radius: radius,
        location: location,
      });
      console.log("body", body);
      try {
        const res = await axios.post(
          "/scrappers/twitter_scrapper_location/",
          body,
          config
        );
        console.log("hello", res.data);
        const csvData = JSON.parse(JSON.stringify(res.data));
        fileDownload(csvData["scrapper"], search_word + ".csv");

        dispatch({
          type: TWITTER_SCRAPE_SUCCESS,
          payload: {
            data: csvData["data"],
          },
        });
        // fileDownload(res.data, search_word+'.csv');

        // alert("Your file have been successfully created. ");
        // return <Message title='Congratulations' message='Your file have been successfully created.' show={true}/>
      } catch (error) {
        const b = JSON.stringify(error.response.data, null, 2);
        dispatch({
          type: TWITTER_SCRAPE_FAIL,
          payload: JSON.parse(b),
        });
        // const a = JSON.stringify(error.response.data, null, 2);
        // // console.log(JSON.parse(a))
        // const search = JSON.parse(a);
        // if (search) alert("Error in scraping the data from the twitter");
      }
    } else {
      dispatch({
        type: TWITTER_SCRAPE_FAIL,
      });
    }
  };

export const scrape_facebook_page =
  (page_name, PostCount_page, username, email) => async (dispatch) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };

      const body = JSON.stringify({
        page_name: page_name,
        PostCount_page: PostCount_page,
        username: username,
        email: email,
      });
      console.log("body", body);
      try {
        const res = await axios.post(
          "/scrappers/facebook_scrapper_page/",
          body,
          config
        );
        console.log("hello", res.data);
        const csvData = JSON.parse(JSON.stringify(res.data));
        fileDownload(csvData["scrapper"], page_name + ".csv");

        dispatch({
          type: FACEBOOK_SCRAPE_SUCCESS,
          payload: {
            data: csvData["data"],
          },
        });
        // fileDownload(res.data, search_word+'.csv');

        alert("Your file have been successfully created. ");
        // return <Message title='Congratulations' message='Your file have been successfully created.' show={true}/>
      } catch (error) {
        dispatch({
          type: FACEBOOK_SCRAPE_FAIL,
          payload:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
        });
        // const a = JSON.stringify(error.response.data, null, 2);
        // // console.log(JSON.parse(a))
        // const search = JSON.parse(a);
        // if (search) alert("Error in scraping the data from the facebook");
      }
    } else {
      dispatch({
        type: FACEBOOK_SCRAPE_FAIL,
      });
    }
  };

export const scrape_facebook_post =
  (url_post, username, email) => async (dispatch) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };

      const body = JSON.stringify({
        url_post: url_post,
        username: username,
        email: email,
      });
      console.log("body", body);

      try {
        const res = await axios.post(
          "/scrappers/facebook_scrapper_post/",
          body,
          config
        );
        console.log("hello", res.data);
        const name = url_post.split(".");
        const csvData = JSON.parse(JSON.stringify(res.data));
        fileDownload(
          csvData["scrapper"],
          url_post.split(".")[name.length - 1] + "_Post.csv"
        );

        dispatch({
          type: FACEBOOK_SCRAPE_SUCCESS,
          payload: {
            data: csvData["data"],
          },
        });
        // fileDownload(res.data, search_word+'.csv');

        alert("Your file have been successfully created. ");
        // return <Message title='Congratulations' message='Your file have been successfully created.' show={true}/>
      } catch (error) {
        dispatch({
          type: FACEBOOK_SCRAPE_FAIL,
          payload:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
        });
        // const a = JSON.stringify(error.response.data, null, 2);
        // // console.log(JSON.parse(a))
        // const search = JSON.parse(a);
        // if (search) alert("Error in scraping the data from the facebook");
      }
    } else {
      dispatch({
        type: FACEBOOK_SCRAPE_FAIL,
      });
    }
  };

export const scrape_facebook_comments =
  (url_comments, username, email) => async (dispatch) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };

      const body = JSON.stringify({
        url_comments: url_comments,
        username: username,
        email: email,
      });
      console.log("body", body);
      try {
        const res = await axios.post(
          "/scrappers/facebook_scrapper_comments/",
          body,
          config
        );
        console.log("hello", res.data);
        const name = url_comments.split(".");
        const csvData = JSON.parse(JSON.stringify(res.data));
        fileDownload(
          csvData["scrapper"],
          url_comments.split(".")[name.length - 1] + "_Comments.csv"
        );

        dispatch({
          type: FACEBOOK_SCRAPE_SUCCESS,
          payload: {
            data: csvData["data"],
          },
        });
        // fileDownload(res.data, search_word+'.csv');

        alert("Your file have been successfully created. ");
        // return <Message title='Congratulations' message='Your file have been successfully created.' show={true}/>
      } catch (error) {
        dispatch({
          type: FACEBOOK_SCRAPE_FAIL,
          payload:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
        });
        // const a = JSON.stringify(error.response.data, null, 2);
        // // console.log(JSON.parse(a))
        // const search = JSON.parse(a);
        // if (search) alert("Error in scraping the data from the facebook");
      }
    } else {
      dispatch({
        type: FACEBOOK_SCRAPE_FAIL,
      });
    }
  };

export const scrape_facebook_group =
  (group_name, PostCount_group, username, email) => async (dispatch) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };

      const body = JSON.stringify({
        group_name: group_name,
        PostCount_group: PostCount_group,
        username: username,
        email: email,
      });
      console.log("body", body);
      try {
        const res = await axios.post(
          "/scrappers/facebook_scrapper_group/",
          body,
          config
        );
        console.log("hello", res.data);
        const csvData = JSON.parse(JSON.stringify(res.data));
        fileDownload(csvData["scrapper"], group_name + ".csv");

        dispatch({
          type: FACEBOOK_SCRAPE_SUCCESS,
          payload: {
            data: csvData["data"],
          },
        });
        // fileDownload(res.data, search_word+'.csv');

        alert("Your file have been successfully created. ");
        // return <Message title='Congratulations' message='Your file have been successfully created.' show={true}/>
      } catch (error) {
        dispatch({
          type: FACEBOOK_SCRAPE_FAIL,
          payload:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
        });
        // const a = JSON.stringify(error.response.data, null, 2);
        // // console.log(JSON.parse(a))
        // const search = JSON.parse(a);
        // if (search) alert("Error in scraping the data from the facebook");
      }
    } else {
      dispatch({
        type: FACEBOOK_SCRAPE_FAIL,
      });
    }
  };

// export const handlePDFDownload = (filename) => async (dispatch) => {
//   if (localStorage.getItem("access")) {
//     const config = {
//       headers: {
//         // "Content-Type": "multipart/form-data",
//         Authorization: `JWT ${localStorage.getItem("access")}`,
//         // responseType: "blob",
//         // Accept: "multipart/form-data",
//       },
//     };

//     console.log(filename)
//     axios
//       .post("/scrappers/download/", filename, config)
//       .then((res) => {
//         // fileDownload(res.data, filename);
//         console.log(res);

//         dispatch({
//           type: TWITTER_SCRAPE_SUCCESS,
//           payload: res.data,
//         });

//         console.log(res.data)
//       })

//       .catch((err) => {
//         console.log(err);
//       });
//     // try {
//     //   const res = await axios.get(
//     //     "/scrappers/download/",
//     //     config
//     //   );
//     //   console.log(res.data)
//     //   fileDownload(res.data, filename)
//     //   dispatch(
//     //     {
//     //       payload: res.data
//     //     }
//     //   )
//     //   console.log(res.data)
//     // }

//     // catch (error) {
//     //   console.log(error)
//     // }
//   }
// };
// //   axios
// //     .get(
// //       "/scrappers/download/",
// //       {
// //         responseType: "blob",
// //       },
// //       config
// //     )
// //     .then((res) => {
// //       fileDownload(res.data, filename);
// //       console.log(res);
// //     })
// //     .catch((err) => {
// //       console.log(err);
// //     });
// // }

export const handlePDFDownload_twitter = (filename) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/force-download",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        // Accept: "application/json",
      },
    };

    const body = JSON.stringify({
      filename: filename,
    });
    console.log("body", body);
    try {
      const res = await axios.get("/scrappers/download-twitter/", body, config);
      fileDownload(res.data, filename + ".csv");
      console.log("hello", res.data);

      dispatch({
        type: FILE_DOWLOAD_SUCCESS,
        payload: res.data,
      });

      // handlePDFDownload(search_word);

      // alert("Your file have been successfully created. ");
      // return <Message title='Congratulations' message='Your file have been successfully created.' show={true}/>
    } catch (error) {
      dispatch({
        type: FILE_DOWLOAD_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
      const a = JSON.stringify(error.response.data, null, 2);
      // console.log(JSON.parse(a))
      const search = JSON.parse(a);
      // if (search) alert("Error in scraping the data from the twitter");
    }
  } else {
    dispatch({
      type: FILE_DOWLOAD_FAIL,
    });
  }
};

export const handlePDFDownload_facebook = (filename) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/force-download",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        // Accept: "application/json",
      },
    };

    const body = JSON.stringify({
      filename: filename,
    });
    console.log("body", body);
    try {
      const res = await axios.get(
        "/scrappers/download-facebook/",
        body,
        config
      );
      fileDownload(res.data, filename + ".csv");
      console.log("hello", res.data);

      dispatch({
        type: FILE_DOWLOAD_SUCCESS,
        payload: res.data,
      });

      // handlePDFDownload(search_word);

      // alert("Your file have been successfully created. ");
      // return <Message title='Congratulations' message='Your file have been successfully created.' show={true}/>
    } catch (error) {
      dispatch({
        type: FILE_DOWLOAD_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
      const a = JSON.stringify(error.response.data, null, 2);
      // console.log(JSON.parse(a))
      const search = JSON.parse(a);
      // if (search) alert("Error in scraping the data from the twitter");
    }
  } else {
    dispatch({
      type: FILE_DOWLOAD_FAIL,
    });
  }
};
