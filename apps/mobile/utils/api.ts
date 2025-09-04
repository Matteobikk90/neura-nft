import { proxyTarget } from "@/constants/urls";
import axios, { type AxiosRequestConfig } from "axios";

type Method = "GET" | "POST" | "PUT" | "DELETE";

export const axiosRequest = async <TResponse, TBody = unknown>(
  method: Method,
  url: string,
  data?: TBody,
  config: AxiosRequestConfig = {},
): Promise<TResponse | undefined> => {
  const finalConfig: AxiosRequestConfig = {
    baseURL: proxyTarget,
    ...config,
  };

  try {
    const response =
      method === "GET"
        ? await axios.get<TResponse>(url, finalConfig)
        : method === "POST"
          ? await axios.post<TResponse>(url, data, finalConfig)
          : method === "PUT"
            ? await axios.put<TResponse>(url, data, finalConfig)
            : await axios.delete<TResponse>(url, finalConfig);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ERR_CANCELED") {
        console.warn("Request canceled");
        return undefined;
      }
      console.error(
        `Axios error: ${error.response?.status || "Unknown"} - ${error.message}`,
      );
    } else {
      console.error("Unexpected error occurred", error);
    }
    throw error;
  }
};

// Convenience helpers
export const axiosGet = async <T>(url: string, config?: AxiosRequestConfig) =>
  axiosRequest<T>("GET", url, undefined, config);

export const axiosPost = async <TResponse, TBody>(
  url: string,
  data: TBody,
  config?: AxiosRequestConfig,
) => axiosRequest<TResponse, TBody>("POST", url, data, config);

export const axiosPut = async <TResponse, TBody>(
  url: string,
  data: TBody,
  config?: AxiosRequestConfig,
) => axiosRequest<TResponse, TBody>("PUT", url, data, config);

export const axiosDelete = async (url: string, config?: AxiosRequestConfig) =>
  axiosRequest<void>("DELETE", url, undefined, config);
