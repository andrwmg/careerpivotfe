import http from "./http-common";


class GroupDataService {

  getAll() {
    return http.get('/groups/titles')
  }

  getSome() {
    const path = "/groups" + window.location.search
    return http.get(path);
  }

  getMy(userId) {
    const path = `/groups/users/${userId}`
    return http.get(path)
  }

  join(groupId, data) {
    const path = `/groups/${groupId}/members`
    return http.put(path, data)
  }

  getPopular(career) {
    const path = `/groups/career/${career}`
    return http.get(path)
  }

  create(data) {
      return http.post("/groups", data)
  }

  update(id, data) {
    return http.put(`/groups/${id}`, data);
  }

  delete(postId) {
    return http.delete(`/groups/${postId}`);
  }

  like(postId, userId) {
    return http.get(`/groups/${postId}/likes/${userId}`);
  }

  dislike(postId, userId) {
    return http.get(`/groups/${postId}/dislikes/${userId}`);
  }

  seed(data) {
      return http.post('/groups/seed', data)
  }

  get(groupId) {
    console.log(groupId)
    return http.get(`/groups/${groupId}`);
  }

  deleteAll() {
    return http.delete(`/groups`);
  }

  findById(_id) {
    return http.get(`/groups?title=${_id}`);
  }
}

export default new GroupDataService();