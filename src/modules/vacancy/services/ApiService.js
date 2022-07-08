import {request} from '../../../services/api';

class ApiService {
    static BASE_API_URL = 'candidates/candidates';
    static getAllVacancy = (params) => {
        return request.get(`${this.BASE_API_URL}/filial-vacancies`, {
            params: {
                ...params
            },
        });
    };
    static synchronizeAllVacancy = (code) => {
        return request.post(`${this.BASE_API_URL}/update-candidates`, {
            code
        });
    };

    static applyCandidateInfo = (values) => {
        return request.post(`${this.BASE_API_URL}/request-candidate`, {
            ...values
        });
    };

    static applyCandidateFiles = (formData) => {
        return request.post(`${this.BASE_API_URL}/file-upload`, formData);
    };

    static downloadCandidateExcel = (code) => {
        return request.post(`${this.BASE_API_URL}/excel`, {code});
    };

    static candidateQuestions = (params) => {
        return request.post(`${this.BASE_API_URL}/candidate-questions`, {...params});
    };

    static candidateStatusChange = (params) => {
        return request.post(`${this.BASE_API_URL}/candidate-history`, {...params});
    };

    static changeStatus = (params) => {
        return request.post(`/candidates/department-candidate/candidates-department`, {...params});
    };

    static createRole = ({role,description}) => {
        return request.post(`candidates/role-candidate/list-role`, {role,description});
    };

    static giveRole = ({role,phone}) => {
        return request.post(`candidates/role-candidate/role-user`, {role,phone});
    };

    static revertRole = ({role,user_id}) => {
        return request.post(`candidates/role-candidate/role-revert`, {role,user_id});
    };
    static vacancyUser = ({params,role}) => {
        return request.get(`candidates/role-candidate/index?role=${role}`, { params: params });
    };
    static getMvdData = (params) => {
        return request.post(`candidates/candidates/get-data`, {...params});
    };

    static getCandidateFile = (candidate_id) => {
        return request.post(`candidates/candidates/questions-file`, {candidate_id});
    };
}

export default ApiService;
