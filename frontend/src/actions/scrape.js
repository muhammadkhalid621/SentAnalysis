import axios from "axios";
import { SCRAPE_SUCCESS, SCRAPE_FAIL, DATA_UPLOAD_SUCCESS,
  DATA_UPLOAD_FAIL, } from "../actions/types";

export const scrape_twitter = (search_word,username,email) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `JWT ${localStorage.getItem("access")}`,
        'Accept': "application/json",
      },
    };

    const body = JSON.stringify({ 
      search_word: search_word,
      username: username,
      email: email 
    });
    console.log('body',body)
    try {
        
      const res = await axios.post("/scrappers/twitter_scrapper/", body, config);
      console.log('hello',res.data);

      dispatch({
        type: SCRAPE_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: SCRAPE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  } else {
    dispatch({
      type: SCRAPE_FAIL,
    });
  }
};

export const file_upload = (data) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `JWT ${localStorage.getItem("access")}`,
        // 'Accept': '*/*',
      },
    };

    // const body = JSON.stringify({ 
    //   File: File,
    //   fileData: fielData,
    //   option: option,
    //   username: username,
    //   email: email 
    // });
    console.log('body',...data)
    try {
        
      const res = await axios.post("/models/SentAModel/", data, config);
      console.log('hello',res.data);

      dispatch({
        type: SCRAPE_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: SCRAPE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  } else {
    dispatch({
      type: SCRAPE_FAIL,
    });
  }
};
