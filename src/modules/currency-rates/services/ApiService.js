import {request} from '../../../services/api';

class ApiService {
    static BASE_API_URL = 'currency/passport';

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


    static signPdf = (params={}) => {
        return request.post(`currency/cert-sign/sign`, {
            ...params
        });
    };
}

export default ApiService;
