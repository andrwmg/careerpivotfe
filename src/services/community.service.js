import http from "./http-common";


class CommunityDataService {

  getAll() {
    const path = "/communities" + window.location.search
    return http.get(path);
  }

  getMy(userId) {
    const path = `/communities/users/${userId}`
    return http.get(path)
  }

  create(data) {
      return http.post("/posts", data)
  }

  update(id, data) {
    return http.put(`/posts/${id}`, data);
  }

  delete(postId) {
    return http.delete(`/posts/${postId}`);
  }

  like(postId, userId) {
    return http.get(`/posts/${postId}/likes/${userId}`);
  }

  dislike(postId, userId) {
    return http.get(`/posts/${postId}/dislikes/${userId}`);
  }

  seed(data) {
      return http.post('/posts', data)
  }

  get(id) {
    return http.get(`/posts/${id}`);
  }

  deleteAll() {
    return http.delete(`/posts`);
  }

  findById(_id) {
    return http.get(`/posts?title=${_id}`);
  }
}

export default new CommunityDataService();