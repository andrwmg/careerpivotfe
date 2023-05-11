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

  join(communityId, data) {
    const path = `/communities/${communityId}/members`
    return http.put(path, data)
  }

  getPopular(career) {
    const path = `/communities/career/${career}`
    return http.get(path)
  }

  create(data) {
      return http.post("/communities", data)
  }

  update(id, data) {
    return http.put(`/communities/${id}`, data);
  }

  delete(postId) {
    return http.delete(`/communities/${postId}`);
  }

  like(postId, userId) {
    return http.get(`/communities/${postId}/likes/${userId}`);
  }

  dislike(postId, userId) {
    return http.get(`/communities/${postId}/dislikes/${userId}`);
  }

  seed(data) {
      return http.post('/communities', data)
  }

  get(communityId) {
    console.log(communityId)
    return http.get(`/communities/${communityId}`);
  }

  deleteAll() {
    return http.delete(`/communities`);
  }

  findById(_id) {
    return http.get(`/communities?title=${_id}`);
  }
}

export default new CommunityDataService();