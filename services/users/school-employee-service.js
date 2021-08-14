import http from "../http-common";

class EmployeesService {
<<<<<<< HEAD
  getAll() {
    return http.get("/employees");
  }
  getPaginated(page = 1) {
    return http.get("/employees/paginated?limit=5&page=" + page);
  }
  searchPaginated(search, page = 1) {
    return http.get(
      `/employees/search/paginated?name=${search}&limit=5&page=${page}`
    );
  }

  getByUserId(id) {
    return http.get(`/employees/user/${id}`);
  }

  getAllActive() {
    return http.get("/employees/status/ACTIVE");
  }

  getStatused(status) {
    return http.get(`/employees/status/${status}`);
  }

  get(id) {
    return http.get(`/employees/${id}`);
  }

  create(data) {
    return http.post("/employees", data);
  }

  update(id, data) {
    return http.put(`/employees/${id}`, data);
  }

  delete(id) {
    return http.delete(`/employees/${id}`);
  }

  getSchoolEmployees() {
    return http.get("/school-employees");
  }
=======

    getAll() {
        return http.get("/employees");
    }
    getPaginated(page = 1){
        return http.get("/employees/paginated?limit=5&page="+page);
    }
    searchPaginated(search, page = 1){
        return http.get(`/employees/search/paginated?name=${search}&limit=5&page=${page}`);
    }

    getByUserId(id){
        return http.get(`/school-employees/user/${id}`)
    }

    getAllActive(){
        return http.get("/employees/status/ACTIVE")
    }

    getStatused(status){
        return http.get(`/employees/status/${status}`)
    }

    get(id) {
        return http.get(`/employees/${id}`);
    }

    create(data) {
        return http.post("/employees", data)
    }

    update(id, data) {
        return http.put(`/employees/${id}`, data)
    }

    delete(id) {
        return http.delete(`/employees/${id}`)
    }
>>>>>>> 25ce0efd37334f3d54668f632c88a934071110fe
}

export default new EmployeesService();
