import {request} from "../../../services/api";
import axios from 'axios';
import config from "../../../config"
import storage from "../../../services/storage"

class ApiService {

    static createAppeal = (params) => {
        return request.post("site/create", {
            params: {
                "per-page": 20,
                ...params,
            },
        })

    }
    static getAppealIndex = (params) => {
        return request.get('/appeal/appeal/index', {
            params: {
                "size": 20,
                ...params,
            },
        })
    }

    static getAppealById = (id) => {
        const request = axios.create({
            baseURL: 'http://172.28.6.166:50070',
            params: {
                _f: 'json',
            },
            headers: {
                common: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json; charset=utf-8',
                },
            },
        });

        request.interceptors.request.use(
            function(config) {
                if (!config.headers.Authorization) {
                    const token = storage.get('token');
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            function(error) {
                return Promise.reject(error);
            }
        )

        return request.get(`/physical/${id}`)
    }
}

export default ApiService;