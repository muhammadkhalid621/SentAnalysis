import {
  TASK_UPLOADED_FAIL,
  TASK_UPLOADED_SUCCESS,
  GET_TASK_SUCCESS,
  GET_TASK_FAIL,
  TASK_UPDATED_SUCCESS,
  TASK_UPDATED_FAIL,
  TASK_DETAILS_SUCCESS,
  TASK_DETAILS_FAIL,
} from "../actions/types";
import axios from "axios";

export const task_upload =
  (assignTo, assignFrom, tasktitle, taskMessage) => async (dispatch) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };
      const body = JSON.stringify({
        assignTo: assignTo,
        assignFrom: assignFrom,
        tasktitle: tasktitle,
        taskMessage: taskMessage,
        status: false,
      });
      try {
        const res = await axios.post(`/accounts/taskUpload/`, body, config);
        console.log("loading", res.data);

        dispatch({
          type: TASK_UPLOADED_SUCCESS,
          payload: res.data,
        });
      } catch (error) {
        dispatch({
          type: TASK_UPLOADED_FAIL,
          payload:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
        });
      }
    } else {
      dispatch({
        type: TASK_UPLOADED_FAIL,
      });
    }
  };

export const get_task = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    try {
      const res = await axios.get(`/accounts/getTask/`, config);
      console.log("loading", res.data);

      dispatch({
        type: GET_TASK_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: GET_TASK_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  } else {
    dispatch({
      type: GET_TASK_FAIL,
    });
  }
};

export const update_task = (task) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    try {
      const res = await axios.put(
        `/accounts/task-update/${task.task_id}/`,
        task,
        config
      );
      console.log("loading", res.data);

      dispatch({
        type: TASK_UPDATED_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: TASK_UPDATED_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  } else {
    dispatch({
      type: TASK_UPDATED_FAIL,
    });
  }
};

export const get_task_details = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    try {
      const res = await axios.get(`/accounts/task-details/`, config);
      console.log("loading", res.data);

      dispatch({
        type: TASK_DETAILS_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: TASK_DETAILS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  } else {
    dispatch({
      type: TASK_DETAILS_FAIL,
    });
  }
};
