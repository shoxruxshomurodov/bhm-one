import { request } from "../../../services/api";

class ApiService {
  static sendSms = (categoryId, content, file) => {
    return request.post("/sms/send/excel", {
      categoryId,
      content,
      file,
    });
  };

  static changeSmsStatus = (id, status) => {
    return request.get(`/sms/sms/job-view`, { params: { id, status } });
  };
}
export default ApiService;
