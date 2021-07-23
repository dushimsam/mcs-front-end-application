import http from '../http-common'

class MessageService {
    getAll() {
        return http.get("/messages");
    }

    getById(id){
        return http.get(`/messages/${id}`); 
    }

    create(data){
        return http.post("/messages",data)
    }

    getPaginated(){
        return http.get("/messages/paginated")
    }
    search(){
        return http.get("/messages/search")
    }
    searchPaginated(){
        return http.get("/messages/search/paginated")
    }

    delete(id){        
        return http.delete(`/messages/${id}`)
    }
}

export default new MessageService()