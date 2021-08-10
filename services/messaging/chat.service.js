import http from "../http-common";

class ChatService {
  async getParentMessages() {
    return http.get("/parent-messages");
  }
  async getParentMessageReceivers() {
    return http.get("/parent-message-receivers");
  }
  getUserSentMessages(userId) {
    return http.get(`/parent-messages/user/${userId}`);
  }
  getParentMessageReceiver(parentMessageId) {
    return http.get(
      `/parent-message-receivers/parent-message/${parentMessageId}`
    );
  }
  sendMessage(parentMessageDtoPost) {
    return http.post("/parent-messages", parentMessageDtoPost);
  }
}

export default new ChatService();
