import http from "./http-common";

class CommentDataService {
  getAll(data) {
    return http.get(`/posts/${data}/comments`);
  }

  get(data) {
    return http.get(`/posts/${data.id}/comments/${data.commentId}`);
  }

  create(data) {
    return http.post(`/posts/${data.postId}/comments`, data);
  }

  reply(data) {
    return http.post(`/posts/${data.postId}/comments/${data.commentId}`, data);
  }

  like(data) {
    return http.get(`/posts/${data.postId}/comments/${data.commentId}/likes`);
  }

  update(postId, commentId, data) {
    return http.put(`/posts/${postId}/comments/${commentId}`, data);
  }

  delete(data) {
    return http.delete(`/posts/${data.postId}/comments/${data.commentId}`, data);
  }

  deleteAll() {
    return http.delete(`/comments`);
  }

  findById(_id) {
    return http.get(`/comments?title=${_id}`);
  }
}

export default new CommentDataService();