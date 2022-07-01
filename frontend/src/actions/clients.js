import axios from "axios";
import {
  CLIENT_LIST_UPLOAD_SUCCESS,
  CLIENT_LIST_UPLOAD_FAIL,
  CLIENT_DOWLOAD_SUCCESS,
  CLIENT_DOWLOAD_FAIL,
  USER_SUSPEND_SUCCESS,
  USER_SUSPEND_FAIL,
  CLIENT_EMAIL_UPLOADED_SUCCESS,
  CLIENT_EMAIL_UPLOADED_FAIL,
} from "./types";

var fileDownload = require("js-file-download");

export const clients_list = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };

    try {
      const res = await axios.get(`/accounts/clients/`, config);
      console.log("loading", res.data);

      dispatch({
        type: CLIENT_LIST_UPLOAD_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: CLIENT_LIST_UPLOAD_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  } else {
    dispatch({
      type: CLIENT_LIST_UPLOAD_FAIL,
    });
  }
};

export const download_clients = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/force-download",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };

    try {
      const res = await axios.get(`/accounts/downloadClients/`, config);
      fileDownload(res.data, "clients.csv");
      console.log("loading", res.data);

      dispatch({
        type: CLIENT_DOWLOAD_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: CLIENT_DOWLOAD_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  } else {
    dispatch({
      type: CLIENT_DOWLOAD_FAIL,
    });
  }
};

export const suspend_user = (user) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    try {
      const res = await axios.put(
        `/accounts/suspend/${user.user_id}/`,
        user,
        config
      );
      console.log("loading", res.data);

      dispatch({
        type: USER_SUSPEND_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: USER_SUSPEND_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  } else {
    dispatch({
      type: USER_SUSPEND_FAIL,
    });
  }
};

export const send_email = (client_email, subject, body) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    const data = JSON.stringify({ 
      client_email: client_email.email,
      subject: subject,
      body: body,
     });
     console.log(body)
    try {
      const res = await axios.post(`/accounts/send-email/`, data, config);
      console.log("loading", res.data);

      dispatch({
        type: CLIENT_LIST_UPLOAD_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: CLIENT_LIST_UPLOAD_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  } else {
    dispatch({
      type: CLIENT_LIST_UPLOAD_FAIL,
    });
  }
};