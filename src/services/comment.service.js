import http from "./http-common";

class CommentDataService {
  getComments(postId, options) {
    const params = new URLSearchParams()
    for (let option in options) {
      params.append(`${option}`, options[option])
    }
    console.log(params.toString())
    const path = `/posts/${postId}/comments?${params.toString()}`
    return http.get(path);
  }

  getReplies(postId, commentId) {
    return http.get(`/posts/${postId}/comments/${commentId}`);
  }

  create(postId, data) {
    return http.post(`/posts/${postId}/comments`, data);
  }

  reply(postId, commentId, data) {
    return http.post(`/posts/${postId}/comments/${commentId}`, data);
  }

  like(postId, commentId) {
    return http.get(`/posts/${postId}/comments/${commentId}/likes`);
  }

  update(postId, commentId, data) {
    return http.put(`/posts/${postId}/comments/${commentId}`, data);
  }

  delete(postId, commentId, data) {
    return http.delete(`/posts/${postId}/comments/${commentId}`, data);
  }
}

export default new CommentDataService();