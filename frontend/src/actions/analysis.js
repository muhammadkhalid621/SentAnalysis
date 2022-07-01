import axios from "axios";
import {
  TWITTER_SNA_SUCCESS,
  TWITTER_SNA_FAIL,
  TWITTER_PROFILING_SUCCESS,
  TWITTER_PROFILING_FAIL,
  FACEBOOK_SNA_SUCCESS,
  FACEBOOK_SNA_FAIL,
  FACEBOOK_PROFILING_SUCCESS,
  FACEBOOK_PROFILING_FAIL,
  TWITTER_LOGS_SUCCESS,
  TWITTER_LOGS_FAIL,
  FACEBOOK_LOGS_SUCCESS,
  FACEBOOK_LOGS_FAIL,
} from "../actions/types";

export const Twitter_SNA = (data) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    console.log("body", ...data);
    try {
      const res = await axios.post("/analysis/twitter-sna/", data, config);
      console.log("hello", res.data);
      dispatch({
        type: TWITTER_SNA_SUCCESS,
        payload: res.data,
      });
      // alert("Task Completed Successfully. File has been Created");
    } catch (error) {
      const b = JSON.stringify(error.response.data, null, 2);
      dispatch({
        type: TWITTER_SNA_FAIL,
        payload: JSON.parse(b),
      });
      // const a = JSON.stringify(error.response.data, null, 2);
      // const search = JSON.parse(a);
      // if (search) alert("Error in ML models. Please Follow the instructions");
    }
  } else {
    dispatch({
      type: TWITTER_SNA_FAIL,
    });
  }
};

export const Twitter_Profiling = (data) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    console.log("body", ...data);
    try {
      const res = await axios.post(
        "/analysis/twitter-profiling/",
        data,
        config
      );
      console.log("hello", res.data);
      dispatch({
        type: TWITTER_PROFILING_SUCCESS,
        payload: res.data,
      });
      // alert("Task Completed Successfully. File has been Created");
    } catch (error) {
      const b = JSON.stringify(error.response.data, null, 2);
      dispatch({
        type: TWITTER_PROFILING_FAIL,
        payload: JSON.parse(b),
      });
      // const a = JSON.stringify(error.response.data, null, 2);
      // const search = JSON.parse(a);
      // if (search) alert("Error in ML models. Please Follow the instructions");
    }
  } else {
    dispatch({
      type: TWITTER_PROFILING_FAIL,
    });
  }
};

export const Twitter_Logs = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    try {
      const res = await axios.put("/analysis/twitter-logs/", config);
      dispatch({
        type: TWITTER_LOGS_SUCCESS,
        payload: res.data,
      });
      // alert("Task Completed Successfully. File has been Created");
    } catch (error) {
      const b = JSON.stringify(error.response.data, null, 2);
      dispatch({
        type: TWITTER_LOGS_FAIL,
        payload: JSON.parse(b),
      });
      // const a = JSON.stringify(error.response.data, null, 2);
      // const search = JSON.parse(a);
      // if (search) alert("Error in ML models. Please Follow the instructions");
    }
  } else {
    dispatch({
      type: TWITTER_LOGS_FAIL,
    });
  }
};

export const Fb_SNA = (data) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    console.log("body", ...data);
    try {
      const res = await axios.post("/analysis/fb-sna/", data, config);
      console.log("hello", res.data);
      dispatch({
        type: FACEBOOK_SNA_SUCCESS,
        payload: res.data,
      });
      // alert("Task Completed Successfully. File has been Created");
    } catch (error) {
      const b = JSON.stringify(error.response.data, null, 2);
      dispatch({
        type: FACEBOOK_SNA_FAIL,
        payload: JSON.parse(b),
      });
      // const a = JSON.stringify(error.response.data, null, 2);
      // const search = JSON.parse(a);
      // if (search) alert("Error in ML models. Please Follow the instructions");
    }
  } else {
    dispatch({
      type: FACEBOOK_SNA_FAIL,
    });
  }
};

export const Fb_Profiling = (data) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    console.log("body", ...data);
    try {
      const res = await axios.post(
        "/analysis/twitter-profiling/",
        data,
        config
      );
      console.log("hello", res.data);
      dispatch({
        type: FACEBOOK_PROFILING_SUCCESS,
        payload: res.data,
      });
      // alert("Task Completed Successfully. File has been Created");
    } catch (error) {
      const b = JSON.stringify(error.response.data, null, 2);
      dispatch({
        type: FACEBOOK_PROFILING_FAIL,
        payload: JSON.parse(b),
      });
      // const a = JSON.stringify(error.response.data, null, 2);
      // const search = JSON.parse(a);
      // if (search) alert("Error in ML models. Please Follow the instructions");
    }
  } else {
    dispatch({
      type: FACEBOOK_PROFILING_FAIL,
    });
  }
};

export const Facebook_Logs = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    try {
      const res = await axios.put("/analysis/twitter-logs/", config);
      dispatch({
        type: FACEBOOK_LOGS_SUCCESS,
        payload: res.data,
      });
      // alert("Task Completed Successfully. File has been Created");
    } catch (error) {
      const b = JSON.stringify(error.response.data, null, 2);
      dispatch({
        type: FACEBOOK_LOGS_FAIL,
        payload: JSON.parse(b),
      });
      // const a = JSON.stringify(error.response.data, null, 2);
      // const search = JSON.parse(a);
      // if (search) alert("Error in ML models. Please Follow the instructions");
    }
  } else {
    dispatch({
      type: FACEBOOK_LOGS_FAIL,
    });
  }
};
