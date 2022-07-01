import {
  CLIENT_LIST_UPLOAD_FAIL,
  CLIENT_LIST_UPLOAD_SUCCESS,
  CLIENT_DOWLOAD_SUCCESS,
  CLIENT_DOWLOAD_FAIL,
  USER_SUSPEND_SUCCESS,
  USER_SUSPEND_FAIL,
  CLIENT_EMAIL_UPLOADED_SUCCESS,
  CLIENT_EMAIL_UPLOADED_FAIL,
  LOGOUT,
} from "../actions/types";

const initialState = {
  client_list_suspended: [],
  client_list_unsuspended: [],
  active: "",
  non_active: "",
  premium: "",
  client_email: "",
  subject: "",
  body: "",
  // username_client: [],
  // email_client: [],
  // gender_client: [],
  // dob_client: [],
  // image_client: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CLIENT_LIST_UPLOAD_SUCCESS:
      return {
        ...state,
        client_list_suspended: payload["clients_suspended"],
        client_list_unsuspended: payload["clients_unsuspend"],
        active: payload["active"],
        non_active: payload["non-active"],
        premium: payload["plan"],
        // username_client: payload.username,
        // email_client: payload.email,
        // gender_client: payload.gender,
        // dob_client: payload.dob,
        // image_client: payload.image,
      };

    case CLIENT_LIST_UPLOAD_FAIL:
      return {
        ...state,
        client_list_suspended: [],
        client_list_unsuspended: [],
        active: "",
        non_active: "",
        premium: "",
        // username_client: [],
        // email_client: [],
        // gender_client: [],
        // dob_client: [],
        // image_client: [],
      };
    case CLIENT_DOWLOAD_SUCCESS:
    case CLIENT_DOWLOAD_FAIL:
    case USER_SUSPEND_SUCCESS:
    case USER_SUSPEND_FAIL:
      return {
        ...state,
      };

    case CLIENT_EMAIL_UPLOADED_SUCCESS:
      return {
        ...state,
        client_email: payload.client_email,
        subject: payload.subject,
        body: payload.body,
      };
    case CLIENT_EMAIL_UPLOADED_FAIL:
      return {
        ...state,
        client_email: "",
        subject: "",
        body: "",
      };
    case LOGOUT:
      return {
        ...state,
        client_list_suspended: [],
        client_list_unsuspended: [],
        active: "",
        non_active: "",
        premium: "",
        client_email: "",
        subject: "",
        body: "",
      };
    default:
      return state;
  }
}
