import http from "../http-common";
class ParentService {

    getAll() {
        return http.get("/parents");
    }

    getValid() {
        return http.get("/parents/valid");
    }

    getPaginated(page = 0) {
        return http.get("/parents/paginated?size=5&sort=createdAt,desc&page=" + page);
    }

    searchPaginated(search, page = 0) {
        return http.get(`/parents/search/${search}/paginated?size=5&page=${page}`);
    }

    get(id) {
        return http.get(`/parents/${id}`);
    }

    getAllPaginated(page = 0) {
        return http.get("/parents/paginated?size=5&sort=createdAt,desc&page=" + page);
    }

    getAllByConfirmStatusPaginated(status, page = 0) {
        return http.get(`/parents/confirm-status/${status}/paginated?size=5&sort=createdAt,desc&page=${page}`);
    }

    searchByConfirmStatusPaginated(status, key, page = 0) {
        return http.get(`/confirm-status/${status}/search/${key}/paginated?size=5&sort=createdAt,desc&page=${page}`);
    }


    getByUser(userId) {
        return http.get(`/parents/user/${userId}`);
    }
    create(data) {
        return http.post("/parents", data)
    }

    update(id, data) {
        return http.put(`/parents/${id}`, data)
    }

    delete(id) {
        return http.delete(`/parents/${id}`)
    }


}

export default new ParentService();
