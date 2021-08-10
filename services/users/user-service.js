import http from "../http-common";


class UserService {

    getAll() {
        return http.get("/users");
    }

    getValid(){
        return http.get("/users/valid");
    }

    getPaginated(page=1) {
        return http.get("/users/paginated?limit=5&page=" + page);
    }

    searchPaginated(search, page = 1){
        return http.get(`/users/search/paginated?name=${search}&limit=5&page=${page}`);
    }

    get(id) {
        return http.get(`/users/${id}`);
    }

    
    getByUsername(username) {
        return http.get(`/users/username/${username}`);
    }

       
    getByEmail(email) {
        return http.get(`/users/email/${email}`);
    }

    create(data) {
        return http.post("/users", data)
    }

    update(id, data) {
        return http.put(`/users/${id}`, data)
    }

    toggleConfirm(id){
        return http.put(`/users/toggle-confirm/${id}`)
    }

    toggleDisable(id) {
        return http.put(`/users/toggle-disable/${id}`)
    }

    delete(id) {
        return http.delete(`/users/${id}`)
    }


}

export default new UserService();
