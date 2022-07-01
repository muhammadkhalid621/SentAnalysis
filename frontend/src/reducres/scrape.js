import {
  TWITTER_SCRAPE_SUCCESS,
  TWITTER_SCRAPE_FAIL,
  FACEBOOK_SCRAPE_SUCCESS,
  FACEBOOK_SCRAPE_FAIL,
  DATA_UPLOAD_SUCCESS,
  DATA_UPLOAD_FAIL,
  FILE_DOWLOAD_SUCCESS,
  FILE_DOWLOAD_FAIL,
  LOGOUT,
} from "../actions/types";

const initialState = {
  query: "",
  tweetCount: "",
  start: "",
  end: "",
  emial: "",
  username: "",
  isChecked: "",
  radius: "",
  location: "",

  page_name: "",
  PostCount_page: "",
  url_post: "",
  url_comments: "",
  group_name: "",
  PostCount_group: "",
  error: null,
  scrapeDone: null,
  downloadFile: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case TWITTER_SCRAPE_SUCCESS:
      return {
        ...state,
        query: payload.data.query,
        tweetCount: payload.data.tweetCount,
        start: payload.data.start,
        end: payload.data.end,
        emial: payload.data.emial,
        username: payload.data.username,
        isChecked: payload.data.isChecked,
        radius: payload.data.radius,
        location: payload.data.location,
        scrapeDone: true,
        error: false,
      };

    case TWITTER_SCRAPE_FAIL:
      return {
        ...state,
        query: "",
        tweetCount: "",
        start: "",
        end: "",
        emial: "",
        username: "",
        isChecked: "",
        radius: "",
        location: "",
        scrapeDone: false,
        error: true,
      };

    case FACEBOOK_SCRAPE_SUCCESS:
      return {
        ...state,
        page_name: payload.data.page_name,
        PostCount_page: payload.data.PostCount_page,
        url_post: payload.data.url_post,
        url_comments: payload.data.url_comments,
        group_name: payload.data.group_name,
        PostCount_group: payload.data.PostCount_group,
        scrapeDone: true,
        error: false,
      };

    case FACEBOOK_SCRAPE_FAIL:
      return {
        ...state,
        page_name: "",
        PostCount_page: "",
        url_post: "",
        url_comments: "",
        group_name: "",
        PostCount_group: "",
        scrapeDone: false,
        error: true,
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

    case LOGOUT:
      return {
        ...state,
        query: "",
        tweetCount: "",
        start: "",
        end: "",
        emial: "",
        username: "",
        isChecked: "",
        radius: "",
        location: "",

        page_name: "",
        PostCount_page: "",
        url_post: "",
        url_comments: "",
        group_name: "",
        PostCount_group: "",
        error: null,
        scrapeDone: null,
        downloadFile: null,
      };
    default:
      return state;
  }
}
