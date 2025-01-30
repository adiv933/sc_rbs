import axios from "axios";
import { baseUrl } from "../configs/AppConfig";
import useAuth from "../store/AuthService";

const apiGuestClient = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: "application/json",
  },
});

const getApiGuestClient = async () => {
  return apiGuestClient;
};

// Intercept all requests
apiGuestClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log("Request Error Log", error);
    Promise.reject(error);
  }
);

// Intercept all responses
apiGuestClient.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    console.log("Response Error Log", error);
    return Promise.reject(error);
  }
);

const createAuthApiClient = (token: any) => {
  const authApiClient = axios.create({
    baseURL: baseUrl,
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
  });
  authApiClient.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      console.log("Request Error Log", error);
      return Promise.reject(error);
    }
  );

  // Intercept all responses
  authApiClient.interceptors.response.use(
    async (response) => {
      return response;
    },
    (error) => {
      console.log("Response Error Log", error);
      return Promise.reject(error);
    }
  );

  return authApiClient;
};

const getAuthApiClient = () => {
  const { token } = useAuth.getState();
  return createAuthApiClient(token);
};

export { getApiGuestClient, getAuthApiClient };
