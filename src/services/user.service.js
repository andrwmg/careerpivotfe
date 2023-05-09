import http from "./http-common";

class UserDataService {

  register(data) {
    return http.post("/users/register", data);
  }

  verify(token) {
    return http.get(`/users/verify/${token}`)
  }

  resend(data) {
    return http.post('/users/resend', data)
  }

  login(data) {
    return http.post('/users/login', data);
  }

  forgot(data) {
    return http.post('/users/forgot', data)
  }

  setToken(token) {
    return http.get(`/users/reset/${token}`)
  }

  reset(data) {
    return http.post('/users/reset', data)
  }

  getUser(data) {
    return http.post('/users/getUser', data, { withCredentials: true })
  }

  updateUser(id, data) {
    return http.put(`/users/${id}`, data, { withCredentials: true })
  }

  sendMessage(data) {
    return http.put(`/users/messages/${data.from}/${data.to}`, data, { withCredentials: true })
  }

  logout() {
    return http.get("/users/logout")
  }

}

export default new UserDataService();