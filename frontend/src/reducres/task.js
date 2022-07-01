import {
  TASK_UPLOADED_FAIL,
  TASK_UPLOADED_SUCCESS,
  GET_TASK_SUCCESS,
  GET_TASK_FAIL,
  TASK_UPDATED_SUCCESS,
  TASK_UPDATED_FAIL,
  TASK_DETAILS_SUCCESS,
  TASK_DETAILS_FAIL,
  LOGOUT,
} from "../actions/types";

const initialState = {
  assignTo: "",
  assignFrom: "",
  tasktitle: "",
  taskMessage: "",
  status: false,
  tasks: [],
  task_details: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  console.log(payload);
  switch (type) {
    case TASK_UPLOADED_SUCCESS:
      return {
        ...state,
        assignTo: payload.assignTo,
        assignFrom: payload.assignFrom,
        tasktitle: payload.tasktitle,
        taskMessage: payload.taskMessage,
        status: payload.status,
      };

    case TASK_UPLOADED_FAIL:
      return {
        ...state,
        assignTo: "",
        assignFrom: "",
        tasktitle: "",
        taskMessage: "",
        status: false,
      };
    case GET_TASK_SUCCESS:
      return {
        ...state,
        tasks: payload,
      };
    case GET_TASK_FAIL:
      return {
        ...state,
        tasks: [],
      };

      case TASK_DETAILS_SUCCESS:
      return {
        ...state,
        task_details: payload,
      };
    case TASK_DETAILS_FAIL:
      return {
        ...state,
        task_details: [],
      };

    case TASK_UPDATED_SUCCESS:
      return {
        ...state,
      };
    case TASK_UPDATED_FAIL:
      return {
        ...state,
      };

    case LOGOUT:
      return {
        ...state,
        assignTo: "",
        assignFrom: "",
        tasktitle: "",
        taskMessage: "",
        status: false,
        tasks: [],
        task_details: [],
      };
    default:
      return state;
  }
}
