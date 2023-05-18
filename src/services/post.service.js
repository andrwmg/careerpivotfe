import http from "./http-common";


class PostDataService {

  getAll() {
    const path = "/posts" + window.location.search
    return http.get(path);
  }

  getSome(data) {
    return http.get(`/posts/careers/${data}`)
  }

  trending(data) {
    const params = new URLSearchParams()
    for (let key in data) {
      params.append(key, data[key])
    }
    const path = `/posts/trending?${params.toString()}`
    return http.get(path);
  }

  latest(data) {
    const params = new URLSearchParams()
    for (let key in data) {
      params.append(key, data[key])
    }
    const path = `/posts/latest?${params.toString()}`
    return http.get(path);
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

  get(postId) {
    return http.get(`/posts/${postId}`);
  }

  deleteAll() {
    return http.delete(`/posts`);
  }

  findById(_id) {
    return http.get(`/posts?title=${_id}`);
  }
}

export default new PostDataService();