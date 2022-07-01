import axios from "axios";
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
} from "../actions/types";

var fileDownload = require("js-file-download");

export const twitter_model = (body, filename) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    console.log("body", ...body);
    try {
      const res = await axios.post("/models/twitter-model/", body, config);
      console.log("hello", res.data);
      const name = filename.split(".");
      const csvData = JSON.parse(JSON.stringify(res.data));
      fileDownload(
        csvData["sentiment"],
        filename.split(".")[name.length-2] + "_Sentiment.csv"
      );
      fileDownload(
        csvData["sarcasam"],
        filename.split(".")[name.length-2] + "_Sarcasam.csv"
      );
      dispatch({
        type: TWITTER_MODEL_SUCCESS,
        payload: {
          data: csvData["data"],
        },
      });
      // alert("Task Completed Successfully. File has been Created");
    } catch (error) {
      const b = JSON.stringify(error.response.data, null, 2);
      dispatch({
        type: TWITTER_MODEL_FAIL,
        payload: JSON.parse(b),
      });
      // const a = JSON.stringify(error.response.data, null, 2);
      // const search = JSON.parse(a);
      // if (search) alert("Error in ML models. Please Follow the instructions");
    }
  } else {
    dispatch({
      type: TWITTER_MODEL_FAIL,
    });
  }
};

export const facebook_model = (body, filename) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    console.log("body", ...body);
    try {
      const res = await axios.post("/models/fb-model/", body, config);
      console.log("hello", res.data);
      const name = filename.split(".");
      const csvData = JSON.parse(JSON.stringify(res.data));
      fileDownload(
        csvData["sentiment"],
        filename.split(".")[name.length-2] + "_Pos.csv"
      );
      fileDownload(
        csvData["sarcasam"],
        filename.split(".")[name.length-2] + "_Neg.csv"
      );
      dispatch({
        type: TWITTER_MODEL_SUCCESS,
        payload: {
          data: csvData["data"],
        },
      });
      // alert("Task Completed Successfully. File has been Created");
    } catch (error) {
      const b = JSON.stringify(error.response.data, null, 2);
      dispatch({
        type: TWITTER_MODEL_FAIL,
        payload: JSON.parse(b),
      });
      // const a = JSON.stringify(error.response.data, null, 2);
      // const search = JSON.parse(a);
      // if (search) alert("Error in ML models. Please Follow the instructions");
    }
  } else {
    dispatch({
      type: TWITTER_MODEL_FAIL,
    });
  }
};

export const trian_model_files_upload = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    try {
      const res = await axios.put("/models/model-files/", config);
      console.log("hello", res.data);
      dispatch({
        type: TRAIN_FILES_UPLOAD_SUCCESS,
        payload: res.data,
      });
      // alert("Task Completed Successfully. File has been Created");
    } catch (error) {
      const b = JSON.stringify(error.response.data, null, 2);
      dispatch({
        type: TRAIN_FILES_UPLOAD_FAIL,
        payload: JSON.parse(b),
      });
      // const a = JSON.stringify(error.response.data, null, 2);
      // const search = JSON.parse(a);
      // if (search) alert("Error in ML models. Please Follow the instructions");
    }
  } else {
    dispatch({
      type: TRAIN_FILES_UPLOAD_FAIL,
    });
  }
};

export const trian_file_upload = (data) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    console.log("body", ...data);
    try {
      const res = await axios.post("/models/train/", data, config);
      console.log("hello", res.data);
      dispatch({
        type: TRAIN_DATA_UPLOAD_SUCCESS,
        payload: res.data,
      });
      // alert("Task Completed Successfully. File has been Created");
    } catch (error) {
      const b = JSON.stringify(error.response.data, null, 2);
      dispatch({
        type: TRAIN_DATA_UPLOAD_FAIL,
        payload: JSON.parse(b),
      });
      // const a = JSON.stringify(error.response.data, null, 2);
      // const search = JSON.parse(a);
      // if (search) alert("Error in ML models. Please Follow the instructions");
    }
  } else {
    dispatch({
      type: TRAIN_DATA_UPLOAD_FAIL,
    });
  }
};

export const handlePDFDownload = (filename) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/force-download",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        // Accept: "application/json",
      },
    };

    const body = JSON.stringify({
      filename: filename,
    });
    console.log("body", body);
    try {
      const res = await axios.get("/models/download/", body, config);
      const data = JSON.parse(JSON.stringify(res.data));
      fileDownload(data["sentiment"], filename + "_Sentiment.csv");
      fileDownload(data["sarcasam"], filename + "_Sarcasam.csv");
      console.log("hello", data["sentiment"]);
      console.log("sar", data["sarcasam"]);

      dispatch({
        type: FILE_DOWLOAD_SUCCESS,
        payload: res.data,
      });

      // handlePDFDownload(search_word);

      // alert("Your file have been successfully created. ");
      // return <Message title='Congratulations' message='Your file have been successfully created.' show={true}/>
    } catch (error) {
      dispatch({
        type: FILE_DOWLOAD_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
      const a = JSON.stringify(error.response.data, null, 2);
      // console.log(JSON.parse(a))
      const search = JSON.parse(a);
      // if (search) alert("Error in scraping the data from the twitter");
    }
  } else {
    dispatch({
      type: FILE_DOWLOAD_FAIL,
    });
  }
};

export const predict_client_twitter = (data, filename) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    console.log("body", ...data);
    try {
      const res = await axios.post("/models/predict-twitter/", data, config);
      console.log("hello", res.data);
      const name = filename.split(".");
      const csvData = JSON.parse(JSON.stringify(res.data));
      fileDownload(
        csvData["sentiment"],
        filename.split(".")[name.length-2] + "_Sentiment.csv"
      );
      fileDownload(
        csvData["sarcasam"],
        filename.split(".")[name.length-2] + "_Sarcasam.csv"
      );
      dispatch({
        type: CLIENT_TWITTER_PREDICTION_SUCCESS,
        payload: {
          data: csvData["data"],
          images: csvData["images"],
          summaryData: csvData["summaryData"],
        },
      });
      // alert("Task Completed Successfully. File has been Created");
    } catch (error) {
      const b = JSON.stringify(error.response.data, null, 2);
      dispatch({
        type: CLIENT_TWITTER_PREDICTION_FAIL,
        payload: JSON.parse(b),
      });
      // const a = JSON.stringify(error.response.data, null, 2);
      // const search = JSON.parse(a);
      // if (search) alert("Error in ML models. Please Follow the instructions");
    }
  } else {
    dispatch({
      type: CLIENT_TWITTER_PREDICTION_FAIL,
    });
  }
};

export const predict_client_fb = (data, filename) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    console.log("body", ...data);
    try {
      const res = await axios.post("/models/predict-fb/", data, config);
      console.log("hello", res.data);
      const name = filename.split(".");
      const csvData = JSON.parse(JSON.stringify(res.data));
      fileDownload(
        csvData["sentiment"],
        filename.split(".")[name.length-2] + "_Pos.csv"
      );
      fileDownload(
        csvData["sarcasam"],
        filename.split(".")[name.length-2] + "_Neg.csv"
      );
      dispatch({
        type: CLIENT_FACEBOOK_PREDICTION_SUCCESS,
        payload: {
          data: csvData["data"],
          images: csvData["images"],
          summaryData: csvData["summaryData"],
        },
      });
      // alert("Task Completed Successfully. File has been Created");
    } catch (error) {
      const b = JSON.stringify(error.response.data, null, 2);
      dispatch({
        type: CLIENT_FACEBOOK_PREDICTION_FAIL,
        payload: JSON.parse(b),
      });
      // const a = JSON.stringify(error.response.data, null, 2);
      // const search = JSON.parse(a);
      // if (search) alert("Error in ML models. Please Follow the instructions");
    }
  } else {
    dispatch({
      type: CLIENT_FACEBOOK_PREDICTION_FAIL,
    });
  }
};

export const handlePDFDownload_client = (filename) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/force-download",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        // Accept: "application/json",
      },
    };

    const body = JSON.stringify({
      filename: filename,
    });
    console.log("body", body);
    try {
      const res = await axios.get("/models/download-files/", body, config);
      const data = JSON.parse(JSON.stringify(res.data));
      fileDownload(data["sentiment"], filename + "_Sentiment.csv");
      fileDownload(data["sarcasam"], filename + "_Sarcasam.csv");
      console.log("hello", data["sentiment"]);
      console.log("sar", data["sarcasam"]);

      dispatch({
        type: FILE_DOWLOAD_SUCCESS,
        payload: res.data,
      });

      // handlePDFDownload(search_word);

      // alert("Your file have been successfully created. ");
      // return <Message title='Congratulations' message='Your file have been successfully created.' show={true}/>
    } catch (error) {
      dispatch({
        type: FILE_DOWLOAD_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
      const a = JSON.stringify(error.response.data, null, 2);
      // console.log(JSON.parse(a))
      const search = JSON.parse(a);
      // if (search) alert("Error in scraping the data from the twitter");
    }
  } else {
    dispatch({
      type: FILE_DOWLOAD_FAIL,
    });
  }
};

