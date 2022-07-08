import {request} from "../../../services/api";
import axios from 'axios';
import config from "../../../config"
import storage from "../../../services/storage"

class ApiService {

    static getActiveRequests = (params) => {

        return request.get("katm/requests/index", {
            params: {
                "per-page": 20,
                include: "user , filial",

                ...params,
            },
        })

    }
    static deleteRequests = (requests) => {
        return request.post("katm/requests/delete", {
                emp_code:requests.emp_code,
                inps:requests.inps,
                doc_num:requests.doc_num
        })
    }

    static getMonitoring = (params) => {
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

        return request.get('/physical', {
            params: {
                "size": 20,
                ...params,
            },
        })
    }

    static getMonitoringById = (id) => {
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