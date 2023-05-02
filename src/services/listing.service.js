import http from "./http-common";


class ListingDataService {

  getAll(data) {
    const path = "/listings" + window.location.search
    return http.get(path, data);
  }

  createOne() {
      return http.get("/listings")
  }

  seed(data) {
      return http.post('/listings', data)
  }

  get(id) {
    return http.get(`/listings/${id}`);
  }

  create(data) {
    return http.post("/listings", data)
  }

  update(id, data) {
    return http.put(`/listings/${id}`, data);
  }

  delete(id) {
    return http.delete(`/listings/${id}`);
  }

  deleteAll() {
    return http.delete(`/listings`);
  }

  findById(_id) {
    return http.get(`/listings?title=${_id}`);
  }
}

export default new ListingDataService();