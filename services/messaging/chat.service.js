import http from "../http-common";

class ChatService {
  getParentMessagesEmpl() {
    return http.get("/parent-messages");
  }
  postMessageEmpl() {}
}

export default new ChatService();
