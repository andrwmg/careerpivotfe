import http from "./http-common";

class MessageDataService {
  getAll() {
    return http.get("/comments");
  }

  get(data) {
    return http.get(`/messages/${data.id}/comments/${data.commentId}`);
  }

  create(data) {
    return http.post(`/messages/${data.id}/comments`, data);
  }

  reply(data) {
    return http.post(`/messages/${data.id}/comments/${data.commentId}`, data);
  }

  update(id, data) {
    return http.put(`/comments/${id}`, data);
  }

  delete(data) {
    return http.delete(`/messages/${data.id}/comments/${data.commentId}`, data);
  }

  deleteAll() {
    return http.delete(`/comments`);
  }

  findById(_id) {
    return http.get(`/comments?title=${_id}`);
  }
}

export default new MessageDataService();