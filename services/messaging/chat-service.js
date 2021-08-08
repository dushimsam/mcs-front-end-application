import http from "../http-common";

class ChatService {
  getParentMessagesEmpl() {
    return http.get("/parent-message-receivers");
  }
}

export default new ChatService();
