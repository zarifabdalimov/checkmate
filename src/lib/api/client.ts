import Axios, { AxiosError, AxiosRequestConfig } from "axios";
import { fetchAuthSession } from "aws-amplify/auth";

export const AXIOS_INSTANCE = Axios.create({
  baseURL: "https://o33e57i2m3.execute-api.eu-central-1.amazonaws.com/dev",
  timeout: 10000,
});

AXIOS_INSTANCE.interceptors.request.use(
  async (config) => {
    const session = await fetchAuthSession();
    const idToken = session.tokens?.idToken?.toString();

    if (idToken) {
      config.headers.Authorization = `Bearer ${idToken}`;
    }

    console.log("API Request:", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);

AXIOS_INSTANCE.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.log('[debug]', error)
    console.error(
      "Response error:",
      error.response?.status,
      error.response?.data,
    );

    if (error.response?.status === 401) {
      console.log("Unauthorized access - consider redirecting to login");
    }

    return Promise.reject(error);
  },
);

export const axios = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data);

  // @ts-expect-error - add cancel method to promise
  promise.cancel = () => {
    console.log('[debug]', 'zxc')
    source.cancel("Query was cancelled");
  };

  return promise;
};

export type ErrorType<Error = AxiosError> = Error;
export type BodyType<BodyData = unknown> = BodyData;
