import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  // GOOGLE_AUTH_SUCCESS,
  // GOOGLE_AUTH_FAIL,
  // FACEBOOK_AUTH_SUCCESS,
  // FACEBOOK_AUTH_FAIL,
  LOGOUT,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
} from "../actions/types";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: null,
  user: null,
  username: "",
  email: "",
  password: "",
  re_password: "",
  number: "",
  gender: "",
  dob: "",
  image:"",
  isAdmin: "",
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGIN_SUCCESS:
      // case GOOGLE_AUTH_SUCCESS:
      // case FACEBOOK_AUTH_SUCCESS:
      localStorage.setItem("access", payload.access);
      localStorage.setItem("refresh", payload.refresh);
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh,
        // isAdmin: payload.isAdmin,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };
    case USER_LOADED_SUCCESS:
      // case UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        username: payload.username,
        email: payload.email,
        password: payload.password,
        number: payload.number,
        gender: payload.gender,
        dob: payload.dob,
        image: payload.image,
        isAdmin: payload.isAdmin,
      };
    case USER_LOADED_FAIL:
      return {
        ...state,
        username: "",
        email: "",
        password: "",
        number: "",
        gender: "",
        dob: "",
        image: "",
        isAdmin: "",
      };
    // case USER_LOADED_SUCCESS:
    //     return {
    //         ...state,
    //         user: payload
    //     }
    case AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        
      };
    // case USER_LOADED_FAIL:
    //     return {
    //         ...state,
    //         user: null
    //     }
    // case GOOGLE_AUTH_FAIL:
    // case FACEBOOK_AUTH_FAIL:
    case LOGIN_FAIL:
    case SIGNUP_FAIL:
    case LOGOUT:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
        username: "",
        email: "",
        password: "",
        number: "",
        gender: "",
        dob: "",
        image:"",
        isAdmin: "",
        error: action.payload,
        
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };
    case PASSWORD_RESET_SUCCESS:
    case PASSWORD_RESET_FAIL:
    case PASSWORD_RESET_CONFIRM_SUCCESS:
    case PASSWORD_RESET_CONFIRM_FAIL:
    case ACTIVATION_SUCCESS:
    case ACTIVATION_FAIL:
    case DELETE_USER_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
