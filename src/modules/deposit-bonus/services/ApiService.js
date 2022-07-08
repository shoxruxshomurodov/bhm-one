import {request} from '../../../services/api';

class ApiService {
    static BASE_API_URL = 'bonus/deposit-employee';

    static createCurrencyRate = (params={}) => {
        return request.post(`${this.BASE_API_URL}/create`, {
            ...params
        });
    };

    static updateCurrencyRate = (id,params={}) => {
        return request.put(`${this.BASE_API_URL}/${id}`, {
            ...params
        });
    };
    static getExcel = (period) => {
        return request.post(`bonus/export/export`, {period});
    };
}

export default ApiService;
