import http, { baseUrl } from '../http-common'


class SchoolNewsService {
    getAll() {
        return http.get("/school-news");
    }

    get(id) {
        return http.get("/school-news/" + id);
    }
    post(data) {
        return http.post("/school-news", data);
    }


}

export default new SchoolNewsService()