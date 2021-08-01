import http from "../http-common";
class StudentService {

    getAll() {
        return http.get("/students");
    }

    getValid() {
        return http.get("/students/valid");
    }

    getPaginated(page = 1) {
        return http.get("/students/paginated?limit=5&page=" + page);
    }

    searchPaginated(search, page = 1) {
        return http.get(`/students/search/paginated?name=${search}&limit=5&page=${page}`);
    }

    get(id) {
        return http.get(`/students/${id}`);
    }

    create(data) {
        return http.post("/students", data)
    }

    update(id, data) {
        return http.put(`/students/${id}`, data)
    }

    delete(id) {
        return http.delete(`/students/${id}`)
    }


}

export default new StudentService();
