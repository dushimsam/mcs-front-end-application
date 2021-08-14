import http, { baseUrl } from '../http-common'


class NotificationUsService {
    getAll() {
        return http.get("/contacts");
    }

    parentRegistration() {
        let eventSource = new EventSource(baseUrl + "/notifications/parent-registrations/new");
        return eventSource;
    }

    getById(id) {
        return http.get(`/contacts/${id}`);
    }

    create(data) {
        return http.post("/contacts", data)
    }

    getPaginated() {
        return http.get("/contacts/paginated")
    }
    search() {
        return http.get("/contacts/search")
    }
    searchPaginated() {
        return http.get("/contacts/search/paginated")
    }

    delete(id) {
        return http.delete(`/contacts/${id}`)
    }
}

export default new NotificationUsService()