import Axios from 'axios';
import { stringify } from 'qs';

const createAxios = () => {
  const axios = Axios.create();
  axios.defaults.baseURL = `${process.env.REACT_APP_URL}`;
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common['subdomain'] = window.utility.getSubDomain();

  axios.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
      (res) => {
          
      }
  )

};
