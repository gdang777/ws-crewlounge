import api from './api';

/**
 * Message service for handling communication between users
 */
const messageService = {
  /**
   * Get all conversations for current user
   */
  async getConversations() {
    return api.get('/messages/conversations', true);
  },
  
  /**
   * Get messages between current user and another user
   */
  async getMessagesByUser(userId: string) {
    return api.get(`/messages/${userId}`, true);
  },
  
  /**
   * Send a message to another user
   */
  async sendMessage(data: {
    receiver: string;
    content: string;
    propertyId?: string;
  }) {
    return api.post('/messages', data, true);
  },
  
  /**
   * Mark messages from a user as read
   */
  async markAsRead(userId: string) {
    return api.put(`/messages/read/${userId}`, {}, true);
  },
  
  /**
   * Delete a message
   */
  async deleteMessage(messageId: string) {
    return api.delete(`/messages/${messageId}`, true);
  }
};

export default messageService;
