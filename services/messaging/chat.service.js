import http from "../http-common";

class ChatService {
  getUserSentMessages(userId) {
    return http.get(`/parent-messages/user/${userId}`);
  }
  getParentMessageReceiver(parentMessageId) {
    return http.get(
      `/parent-message-receivers/parent-message/${parentMessageId}`
    );
  }
  getReceivedMessages(userId) {
    return http.get(`/parent-message-receivers/user/${userId}`);
  }
  sendMessage(parentMessageDtoPost) {
    return http.post("/parent-messages", parentMessageDtoPost);
  }
  getUserChat(userId) {
    return http.get(`/parent-message-receivers/user/chat/${userId}`);
  }
  getPagination(userId, page) {
    return http.get(
      `/parent-message-receivers/user/chat/${userId}/paginated?size=20&page=${page}&sort=createdAt,asc`
    );
  }
}

export default new ChatService();
