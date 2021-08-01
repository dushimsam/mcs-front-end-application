import http from "../http-common"

class ContactUsService {
    get_all(){
        return http.get("/contact-us-messages");
    }
    
    create(body){
        return http.post("/contact-us-messages", body);
    }
    
    get_all_paginated(page){
        return http.get("/contact-us-messages/paginated?limit=5&page=" + page);
    }
    
    search(){
        return http.get("/contact-us-messages/search");
    }
    
    search_paginated(search, page){
        return http.get(`/contact-us-messages/search/paginated?name=${search}&limit=5&page=${page}`);
    }
    
    get_by_id(id){
        return http.get("/contact-us-messages/"+id);
    }
    
    edit(id, body){
        return http.put("/contact-us-messages/"+id, body);
    }
    
    delete(id){
        return http.delete("/contact-us-messages/"+id);
    }

    getAllByReadStatus(status)
    {
        return http.get(`/contact-us-messages/is-read/status/${status}`)
    }

    getAllByRepliedStatus(status)
    {
        return http.get(`/contact-us-messages/is-replied/status/${status}`)
    }
   


    //  CONTACT US MESSAGE REPLIES 

    getAllReplies(){
        return http.get("/contact-us-message-replies");
    }
    
    createReply(body){
        return http.post("/contact-us-message-replies", body);
    }
    
    getAllPaginatedReplies(page){
        return http.get("/contact-us-message-replies/paginated?limit=5&page=" + page);
    }
    
    searchReplies(){
        return http.get("contact-us-message-replies/search");
    }
    
    search_paginated_replies(search, page){
        return http.get(`/contact-us-message-replies/search/paginated?name=${search}&limit=5&page=${page}`);
    }
    
    get_reply_by_id(id){
        return http.get("/contact-us-message-replies/"+id);
    }
    
    editReply(id, body){
        return http.put("/contact-us-message-replies/"+id, body);
    }
    
    deleteReply(id){
        return http.delete("/contact-us-message-replies/"+id);
    }

}

export default new ContactUsService();