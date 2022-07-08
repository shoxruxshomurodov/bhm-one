import { request } from "../../api";

class ApiService {
  static LoginOrSignUp = (phone) => {
    return request.post("/auth/default/login-or-sign-up", { phone });
  };
  static Login = (phone, password) => {
    return request.post("/auth/default/login", { phone, password });
  };
  static GetTokenOne = (token) => {
    return request.get(`/auth/default/get-token-by-token/${token}`, {
      params: {
        include: "user"
      }
    });
  };
  static TokenConfirm = (token, secret) => {
    return request.post(`/auth/default/token-confirm?include=user.lastToken`, {
      token,
      secret
    });
  };
  static ResetPassword = (phone) => {
    return request.post(`/auth/default/reset-password`, { phone });
  };

  static LinkProfile = ({ profile_id, agree }) => {
    return request.post(`/auth/default/add-profile`, { profile_id, agree });
  };

  static checkAuth = (token = null) => {
    if (token) {
      return request.get("/auth/default/get-me", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          include: "profile,employee,section"
        }
      });
    }

    return request.get("/auth/default/get-me", {
      params: {
        include: "profile,employee,section"
      }
    });
  };

  static logout = (token = null) => {
    if (token) {
      return request.get("/auth/logout", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return request.get("/auth/logout");
  };

  static CertSign = (certinfo, signedMsg) => {
    return request.post(`/auth/cert-sign/login`, { certinfo, signedMsg });
  };
}
export default ApiService;
