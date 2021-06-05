import { request } from "./axios.service";
import store from "@/store";
const errorHandler = (error) => {
  const errorMessage = {
    title: error.message,
    message: "",
    list: [],
  };
  if (error.response) {
    if (error.response.data) {
      if (error.response.data.message) {
        errorMessage.message = error.response.data.message;
      }
      if (error.response.data.errors) {
        errorMessage.list = error.response.data.errors.map((x) => x);
      }
    }
  }
  return errorMessage;
};
export const get = async (url) => {
  const requestData = {
    method: "GET",
    url: url,
  };
  try {
    const response = await request(requestData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const post = async (url, data, disabledEvents) => {
  const disabled = disabledEvents === "disabledEvents" ? true : false;
  if (!disabled) store.dispatch("request/startRequest");
  const requestData = {
    method: "POST",
    url: url,
    data: data,
  };
  try {
    const response = await request(requestData);
    if (!disabled) store.dispatch("request/successRequest");
    return {
      data: response.data,
      success: true,
    };
  } catch (error) {
    if (!disabled) store.dispatch("request/failedRequest", errorHandler(error));
    return {
      data: error.response,
      message: error.message,
      success: false,
    };
  }
};
export const put = async (url, data, disabledEvents) => {
  const disabled = disabledEvents === "disabledEvents" ? true : false;
  if (!disabled) store.dispatch("request/startRequest");
  const requestData = {
    method: "PUT",
    url: url,
    data: data,
  };
  try {
    const response = await request(requestData);
    if (!disabled) store.dispatch("request/successRequest");
    return {
      data: response.data,
      success: true,
    };
  } catch (error) {
    if (!disabled) store.dispatch("request/failedRequest", errorHandler(error));
    return {
      data: error.response,
      message: error.message,
      success: false,
    };
  }
};
export const del = async (url, disabledEvents) => {
  const disabled = disabledEvents === "disabledEvents" ? true : false;
  if (!disabled) store.dispatch("request/startRequest");
  const requestData = {
    method: "DELETE",
    url: url
  };
  try {
    const response = await request(requestData);
    if (!disabled) store.dispatch("request/successRequest");
    return {
      data: response.data,
      success: true,
    };
  } catch (error) {
    if (!disabled) store.dispatch("request/failedRequest", errorHandler(error));
    return {
      data: error.response,
      message: error.message,
      success: false,
    };
  }
};
