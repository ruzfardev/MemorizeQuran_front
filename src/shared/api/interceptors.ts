import { handleError } from "./error-handle";
import { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { notification } from "../lib";
export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  // notification.show({
  //   title: config.url,
  //   message: config.method,
  //   position: "top-center",
  //   color: "blue",
  // });
  return config;
};

export const responseInterceptor = (response: AxiosResponse) => {
  // notification.show({
  //   title: response.config.url,
  //   message: JSON.stringify(response.data.result),
  //   position: "top-center",
  //   color: "green",
  // });
  return response;
};

export const errorInterceptor = (error: unknown) => {
  handleError(error);

  return Promise.reject(error);
};
