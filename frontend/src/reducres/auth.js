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
  EMAIL_UPLOADED_SUCCESS,
  EMAIL_UPLOADED_FAIL,
  CHANGE_PASS_SUCCESS,
  CHANGE_PASS_FAIL,
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
  plan: "",
  dob: "",
  image: "",
  suspend: "",
  emails: [],
  isLogin: false,
  isAdmin: null,
  old_password: "",
  new_password: "",
  pass_change: null,
  pass_change_error: null,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLogin: true,
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
        isLogin: true,
        isAdmin: payload.isAdmin,
        // isAdmin: payload.isAdmin,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        username: payload.username,
        email: payload.email,
        password: payload.password,
        number: payload.number,
        gender: payload.gender,
        plan: payload.plan,
        dob: payload.dob,
        image: payload.image,
        isAdmin: payload.isAdmin,
        suspend: payload.suspend,
        isAuthenticated: false,
        isSignup: true,
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
        plan: payload.plan,
        dob: payload.dob,
        image: payload.image,
        isAdmin: payload.isAdmin,
        suspend: payload.suspend,
        isLogin: true,
      };
    case USER_LOADED_FAIL:
      return {
        ...state,
        username: "",
        email: "",
        password: "",
        number: "",
        gender: "",
        plan: "",
        dob: "",
        image: "",
        suspend: "",
        isAdmin: null,
        isLogin: false,
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
        isLogin: false,
      };
    // case USER_LOADED_FAIL:
    //     return {
    //         ...state,
    //         user: null
    //     }
    // case GOOGLE_AUTH_FAIL:
    // case FACEBOOK_AUTH_FAIL:
    case SIGNUP_FAIL:
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
        plan: "",
        dob: "",
        image: "",
        isAdmin: "",
        suspend: "",
        isSignup: false,
        isLogin: false,
      };
    case LOGIN_FAIL:
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
        plan: "",
        dob: "",
        image: "",
        isAdmin: "",
        suspend: "",
        isSignup: false,
        isLogin: false,
        old_password: "",
        new_password: "",
        pass_change: null,
        pass_change_error: null,
        error: null,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };
    case PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        isEmail: true,
      };
    case PASSWORD_RESET_FAIL:
      return {
        ...state,
        isEmail: false,
      };
    case PASSWORD_RESET_CONFIRM_SUCCESS:
      return {
        ...state,
        isPassword: true,
      };
    case PASSWORD_RESET_CONFIRM_FAIL:
      return {
        ...state,
        isPassword: false,
      };
    case ACTIVATION_SUCCESS:
      return {
        ...state,
        isActivate: true,
      };
    case ACTIVATION_FAIL:
      return {
        ...state,
        isActivate: false,
      };
    case DELETE_USER_FAIL:
      return {
        ...state,
      };

    case EMAIL_UPLOADED_SUCCESS:
      return {
        ...state,
        emails: payload,
      };
    case EMAIL_UPLOADED_FAIL:
      return {
        ...state,
        emails: [],
      };
    case CHANGE_PASS_SUCCESS:
      return {
        ...state,
        old_password: payload.old_password,
        new_password:payload.new_password,
        pass_change: true,
        pass_change_error: payload,
        error : false
      };
    case CHANGE_PASS_FAIL:
      return {
        ...state,
        old_password: "",
        new_password: "",
        pass_change: false,
        pass_change_error: payload,
        error: true
      };
    default:
      return state;
  }
}
