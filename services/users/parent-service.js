import http from "../http-common";
class ParentService {

    getAll() {
        return http.get("/parents");
    }

    getValid() {
        return http.get("/parents/valid");
    }

    getPaginated(page = 1) {
        return http.get("/parents/paginated?limit=5&page=" + page);
    }

    searchPaginated(search, page = 1) {
        return http.get(`/parents/search/paginated?name=${search}&limit=5&page=${page}`);
    }

    get(id) {
        return http.get(`/parents/${id}`);
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
