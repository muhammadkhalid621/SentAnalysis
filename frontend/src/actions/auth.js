import axios from "axios";
import { Redirect } from "react-router-dom";
import { user_profile } from "./profile";
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
  // GOOGLE_AUTH_SUCCESS,
  // GOOGLE_AUTH_FAIL,
  // FACEBOOK_AUTH_SUCCESS,
  // FACEBOOK_AUTH_FAIL,
  LOGOUT,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
} from "./types";

export const load_user = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(`/accounts/users/me/`, config);
      console.log("loading", res.data);

      dispatch({
        type: USER_LOADED_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: USER_LOADED_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  } else {
    dispatch({
      type: USER_LOADED_FAIL,
    });
  }
};

// export const googleAuthenticate = (state, code) => async dispatch => {
//     if (state && code && !localStorage.getItem("access")) {
//         const config = {
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             }
//         };

//         const details = {
//             'state': state,
//             'code': code
//         };

//         const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

//         try {
//             const res = await axios.post(`//auth/o/google-oauth2/?${formBody}`, config);

//             dispatch({
//                 type: GOOGLE_AUTH_SUCCESS,
//                 payload: res.data
//             });

//             dispatch(load_user());
//         } catch (err) {
//             dispatch({
//                 type: GOOGLE_AUTH_FAIL
//             });
//         }
//     }
// };

// export const facebookAuthenticate = (state, code) => async dispatch => {
//     if (state && code && !localStorage.getItem("access")) {
//         const config = {
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             }
//         };

//         const details = {
//             'state': state,
//             'code': code
//         };

//         const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

//         try {
//             const res = await axios.post(`//auth/o/facebook/?${formBody}`, config);

//             dispatch({
//                 type: FACEBOOK_AUTH_SUCCESS,
//                 payload: res.data
//             });

//             dispatch(load_user());
//         } catch (err) {
//             dispatch({
//                 type: FACEBOOK_AUTH_FAIL
//             });
//         }
//     }
// };

export const checkAuthenticated = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const body = JSON.stringify({ token: localStorage.getItem("access") });

    try {
      const res = await axios.post(`/accounts/jwt/verify/`, body, config);

      if (res.data.code !== "token_not_valid") {
        dispatch({
          type: AUTHENTICATED_SUCCESS,
        });
      } else {
        dispatch({
          type: AUTHENTICATED_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: AUTHENTICATED_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  } else {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(`/accounts/jwt/create/`, body, config);
    console.log(res.data);
    // localStorage.setItem('access',res.data['access'])

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(user_profile());
    dispatch(load_user());
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
    const a = JSON.stringify(error.response.data, null, 2);
    const pass = JSON.parse(a)["password"];
    const user_email = JSON.parse(a)["email"];
    const detail = JSON.parse(a)["detail"];
    if (pass) alert(JSON.parse(a)["password"][0]);
    else if (user_email) alert(JSON.parse(a)["email"][0]);
    else if (detail) alert(JSON.parse(a)["detail"]);
    return <Redirect to="/signup" />;
  }
};

export const signup = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  // const body = JSON.stringify({ username, email, password, re_password, number, gender, dob, image });

  try {
    const res = await axios.post(`/accounts/users/`, data, config);
    console.log(res.data);

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const b = JSON.stringify(error.response.data, null, 2);
    // dispatch(displayError(JSON.parse(b)));
    dispatch({
      type: SIGNUP_FAIL,
      payload: JSON.parse(b),
    });
    const a = JSON.stringify(error.response.data, null, 2);
    // console.log(JSON.parse(a))
    // console.log(JSON.parse(a)['password'][0])
    const pass = JSON.parse(a)["password"];
    const user = JSON.parse(a)["username"];
    const user_email = JSON.parse(a)["email"];
    const user_gender = JSON.parse(a)["gender"];
    const user_dob = JSON.parse(a)["dob"];
    const user_number = JSON.parse(a)["number"];
    if (pass) alert(JSON.parse(a)["password"][0]);
    else if (user) alert(JSON.parse(a)["username"][0]);
    else if (user_email) alert(JSON.parse(a)["email"][0]);
    else if (user_number) alert(JSON.parse(a)["number"][0]);
    else if (user_gender) alert(JSON.parse(a)["gender"][0]);
    else if (user_dob) alert(JSON.parse(a)["dob"][0]);
  }
};
const displayError = (error) => {
  return error;
};

export const verify = (uid, token) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ uid, token });

  try {
    await axios.post("/accounts/users/activation/", body, config);

    dispatch({
      type: ACTIVATION_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ACTIVATION_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const reset_password = (email) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email });

  try {
    await axios.post(`/accounts/users/reset_password/`, body, config);

    dispatch({
      type: PASSWORD_RESET_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PASSWORD_RESET_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });

    console.log(error.message);
  }
};

export const reset_password_confirm =
  (uid, token, new_password, re_new_password) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
      await axios.post(`/accounts/users/reset_password_confirm/`, body, config);

      dispatch({
        type: PASSWORD_RESET_CONFIRM_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: PASSWORD_RESET_CONFIRM_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

export const delete_account = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      //'X-CSRFToken': Cookies.get('csrftoken')
    },
  };

  const body = JSON.stringify({
    withCredentials: true,
  });

  try {
    const res = await axios.delete(`/accounts/delete`, config, body);

    if (res.data.success) {
      dispatch({
        type: DELETE_USER_SUCCESS,
      });
    } else {
      dispatch({
        type: DELETE_USER_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: DELETE_USER_FAIL,
    });
  }
};
