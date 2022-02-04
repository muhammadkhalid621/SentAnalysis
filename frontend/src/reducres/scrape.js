import {
  SCRAPE_SUCCESS,
  SCRAPE_FAIL,
  DATA_UPLOAD_SUCCESS,
  DATA_UPLOAD_FAIL,
} from "../actions/types";

const initialState = { query: "" };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SCRAPE_SUCCESS:
      return {
        ...state,
        query: payload.query,
      };

    case SCRAPE_FAIL:
      return {
        ...state,
        query: "",
      };
    case DATA_UPLOAD_SUCCESS:
      return {
        ...state,
        File: payload.File,
        fileData: payload.fileData,
        option: payload.option,
      };

    case DATA_UPLOAD_FAIL:
      return {
        ...state,
        File: "",
        fileData: "",
        option: "",
      };
    default:
      return state;
      
  }
}
