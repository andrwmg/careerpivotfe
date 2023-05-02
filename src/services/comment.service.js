import http from "./http-common";

class CommentDataService {
  getAll() {
    return http.get("/comments");
  }

  get(data) {
    return http.get(`/listings/${data.id}/comments/${data.commentId}`);
  }

  create(data) {
    return http.post(`/listings/${data.id}/comments`, data);
  }

  reply(data) {
    return http.post(`/listings/${data.id}/comments/${data.commentId}`, data);
  }

  update(id, data) {
    return http.put(`/comments/${id}`, data);
  }

  delete(data) {
    return http.delete(`/listings/${data.id}/comments/${data.commentId}`, data);
  }

  deleteAll() {
    return http.delete(`/comments`);
  }

  findById(_id) {
    return http.get(`/comments?title=${_id}`);
  }
}

export default new CommentDataService();