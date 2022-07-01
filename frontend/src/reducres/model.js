import {
  TWITTER_MODEL_SUCCESS,
  TWITTER_MODEL_FAIL,
  FACEBOOK_MODEL_SUCCESS,
  FACEBOOK_MODEL_FAIL,
  TRAIN_DATA_UPLOAD_SUCCESS,
  TRAIN_DATA_UPLOAD_FAIL,
  TRAIN_FILES_UPLOAD_SUCCESS,
  TRAIN_FILES_UPLOAD_FAIL,
  FILE_DOWLOAD_SUCCESS,
  FILE_DOWLOAD_FAIL,
  CLIENT_TWITTER_PREDICTION_SUCCESS,
  CLIENT_TWITTER_PREDICTION_FAIL,
  CLIENT_FACEBOOK_PREDICTION_SUCCESS,
  CLIENT_FACEBOOK_PREDICTION_FAIL,
  LOGOUT,
} from "../actions/types";

const initialState = {
  File: "",
  fileData: "",
  option: "",
  username: "",
  email: "",
  images: "",
  summaryData: "",
  error: null,
  modelDone: null,
  downloadFile: null,
  report: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case TWITTER_MODEL_SUCCESS:
      return {
        ...state,
        File: payload.data.File,
        fileData: payload.data.fileData,
        option: payload.data.option,
        username: payload.data.username,
        email: payload.data.email,
        modelDone: true,
        error: false,
      };

    case TWITTER_MODEL_FAIL:
      return {
        ...state,
        File: "",
        fileData: "",
        option: "",
        username: "",
        email: "",
        modelDone: false,
        error: true,
      };

      case FACEBOOK_MODEL_SUCCESS:
      return {
        ...state,
        File: payload.data.File,
        fileData: payload.data.fileData,
        option: payload.data.option,
        username: payload.data.username,
        email: payload.data.email,
        modelDone: true,
        error: false,
      };

    case FACEBOOK_MODEL_FAIL:
      return {
        ...state,
        File: "",
        fileData: "",
        option: "",
        username: "",
        email: "",
        modelDone: false,
        error: true,
      };
    case CLIENT_TWITTER_PREDICTION_SUCCESS:
      return {
        ...state,
        File: payload.data.File,
        fileData: payload.data.fileData,
        username: payload.data.username,
        email: payload.data.email,
        images: payload.images,
        summaryData: payload.summaryData,
        modelDone: true,
        error: false,
        report: true,
      };

    case CLIENT_TWITTER_PREDICTION_FAIL:
      return {
        ...state,
        File: "",
        fileData: "",
        option: "",
        username: "",
        email: "",
        images: "",
        summaryData: "",
        modelDone: false,
        error: true,
        report: false,
      };

      case CLIENT_FACEBOOK_PREDICTION_SUCCESS:
        return {
          ...state,
          File: payload.data.File,
          fileData: payload.data.fileData,
          username: payload.data.username,
          email: payload.data.email,
          images: payload.images,
          summaryData: payload.summaryData,
          modelDone: true,
          error: false,
          report: false,
        };
  
      case CLIENT_FACEBOOK_PREDICTION_FAIL:
        return {
          ...state,
          File: "",
          fileData: "",
          option: "",
          username: "",
          email: "",
          images: "",
          summaryData: "",
          modelDone: false,
          error: true,
          report: false,
        };
    case TRAIN_DATA_UPLOAD_SUCCESS:
      return {
        ...state,
        File: payload.File,
        fileData: payload.fileData,
        username: payload.username,
        email: payload.email,
        modelDone: true,
        error: false,
      };

    case TRAIN_DATA_UPLOAD_FAIL:
      return {
        ...state,
        File: "",
        fileData: "",
        username: "",
        email: "",
        modelDone: false,
        error: true,
      };
    case LOGOUT:
      return {
        ...state,
        File: "",
        fileData: "",
        option: "",
        username: "",
        email: "",
        error: null,
        modelDone: null,
        downloadFile: null,
        report: null,
      };
    case FILE_DOWLOAD_SUCCESS:
      return {
        ...state,
        downloadFile: false,
      };

    case FILE_DOWLOAD_FAIL:
      return {
        ...state,
        downloadFile: true,
      };

    case TRAIN_FILES_UPLOAD_SUCCESS:

    case TRAIN_FILES_UPLOAD_FAIL:

    default:
      return state;
  }
}
