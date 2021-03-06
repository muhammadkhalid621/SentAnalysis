import {
  DELETE_USER_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
  UPDATE_USER_PROFILE_SUCCESS,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
} from "../actions/types";

const initialState = {
  username: "",
  email: "",
  password: "",
  re_password: "",
  number: "",
  plan: "",
  gender: "",
  dob: "",
  image: "",
  isAdmin: "",
};
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_PROFILE_SUCCESS:
    // case UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        username: payload.username,
        email: payload.email,
        password: payload.password,
        number: payload.number,
        plan: payload.plan,
        gender: payload.gender,
        dob: payload.dob,
        image: payload.image,
        isAdmin: payload.isAdmin,
      };
    case USER_PROFILE_FAIL:
      return {
        ...state,
        username: "",
        email: "",
        password: "",
        re_password: "",
        number: "",
        plan: "",
        gender: "",
        dob: "",
        image: "",
        isAdmin: "",
      };
    // case UPDATE_USER_PROFILE_FAIL:
    //   return {
    //     ...state
    //   };
    

    default:
      return state;
  }
}
