import http from "./http-common";

class UserDataService {

  register(data) {
    return http.post("/register", data);
  }

  verify(token) {
    return http.get(`/verify/${token}`)
  }

  resend(data) {
    return http.post('/resend', data)
  }

  login(data) {
    return http.post('/login', data);
  }

  forgot(data) {
    return http.post('/forgot', data)
  }

  setToken(token) {
    return http.get(`/reset/${token}`)
  }

  reset(data) {
    return http.post('/reset', data)
  }

  getUser(data) {
    return http.post('/getUser', data, { withCredentials: true })
  }

  updateUser(id, data) {
    return http.put(`/updateUser/${id}`, data, { withCredentials: true })
  }

  sendMessage(data) {
    return http.put(`/messages/${data.from}/${data.to}`, data, { withCredentials: true })
  }

  logout() {
    return http.get("/logout")
  }

}

export default new UserDataService();