import axios from 'axios';
import { API_Notification_message, serviceUrls } from '../constant/config';
import { getAccessToken, getRefreshToken, setAccessToken, getType } from '../utils/common-utils';

const API_URL = 'http://localhost:5000';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
});

axiosInstance.interceptors.request.use(
    function(config) {
        if (config.responseType?.params) {
            config.params = config.responseType.params;
        } else if (config.responseType?.query) {
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function(response) {
        return processResponse(response);
    },
    function(error) {
        return Promise.reject(processError(error));
    }
);

const processResponse = (response) => {
    if (response?.status === 200) {
        return { isSuccess: true, data: response.data };
    } else {
        return {
            isFailure: true,
            status: response?.status,
            message: response.message,
            code: response.code
        };
    }
};

const processError = async (error) => {
    if (error.response) {
        // Request was made and server responded with a status code out of the range of 2xx
        if (error.response?.status === 403) {
            sessionStorage.clear();
        } else {
            console.error("Error in response:", error);
            return {
                isError: true,
                msg: API_Notification_message.responseFailure,
                code: error.response.status
            };
        }
    } else if (error.request) {
        // The request was made but no response was received
        console.error("Error in request:", error);
        return {
            isError: true,
            msg: API_Notification_message.requestFailure,
            code: ""
        };
    } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Network error:", error);
        return {
            isError: true,
            msg: API_Notification_message.networkError,
            code: ""
        };
    }
};

const API = {};

for (const [key, value] of Object.entries(serviceUrls)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? '' : body,
            responseType: value.responseType,
            headers: {
                authorization: getAccessToken(),
            },
            TYPE: getType(value, body),
            onUploadProgress: function(progressEvent) {
                if (showUploadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentCompleted);
                }
            },
            onDownloadProgress: function(progressEvent) {
                if (showDownloadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentCompleted);
                }
            }
        });
}

export { API };
