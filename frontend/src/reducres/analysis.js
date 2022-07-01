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
  LOGOUT,
} from "../actions/types";

const initialState = {
  File: "",
  fileData: "",
  username: "",
  email: "",
  error: null,
  analysisDone: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case TWITTER_SNA_SUCCESS:
      return {
        ...state,
        File: payload.File,
        fileData: payload.fileData,
        username: payload.username,
        email: payload.email,
        error: false,
        analysisDone: true,
      };
    case TWITTER_SNA_FAIL:
      return {
        ...state,
        File: "",
        fileData: "",
        username: "",
        email: "",
        error: true,
        analysisDone: false,
      };
    case TWITTER_PROFILING_SUCCESS:
      return {
        ...state,
        File: payload.File,
        fileData: payload.fileData,
        username: payload.username,
        email: payload.email,
        error: false,
        analysisDone: false,
      };
    case TWITTER_PROFILING_FAIL:
      return {
        ...state,
        File: "",
        fileData: "",
        username: "",
        email: "",
        error: true,
        analysisDone: false,
      };

    case FACEBOOK_SNA_SUCCESS:
      return {
        ...state,
        File: payload.File,
        fileData: payload.fileData,
        username: payload.username,
        email: payload.email,
        error: true,
        analysisDone: false,
      };
    case FACEBOOK_SNA_FAIL:
      return {
        ...state,
        File: "",
        fileData: "",
        username: "",
        email: "",
        error: true,
        analysisDone: false,
      };
    case FACEBOOK_PROFILING_SUCCESS:
      return {
        ...state,
        File: payload.File,
        fileData: payload.fileData,
        username: payload.username,
        email: payload.email,
        error: false,
        analysisDone: false,
      };
    case FACEBOOK_PROFILING_FAIL:
      return {
        ...state,
        File: "",
        fileData: "",
        username: "",
        email: "",
        error: true,
        analysisDone: false,
      };

    case LOGOUT:
      return {
        ...state,
        File: "",
        fileData: "",
        username: "",
        email: "",
        error: null,
        analysisDone: null,
      };
    case TWITTER_LOGS_SUCCESS:
    case TWITTER_LOGS_FAIL:
    case FACEBOOK_LOGS_SUCCESS:
    case FACEBOOK_LOGS_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
