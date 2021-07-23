import http from '../http-common'

class ContactUsService {
    getAll() {
        return http.get("/contact-us-messages");
    }

    getById(id){
        return http.get(`/contact-us-messages/${id}`); 
    }

    create(data){
        return http.post("/contact-us-messages",data)
    }

    getPaginated(){
        return http.get("/contact-us-messages/paginated")
    }
    search(){
        return http.get("/contact-us-messages/search")
    }
    searchPaginated(){
        return http.get("/contact-us-messages/search/paginated")
    }

    delete(id){        
        return http.delete(`/contact-us-messages/${id}`)
    }
}

export default new ContactUsService()