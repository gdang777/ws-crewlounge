"use client";

import { useState, useEffect, useContext, useRef } from 'react';
import { useRouter } from 'next/navigation';
import AuthContext from '../../context/AuthContext';
import messageService from '../../services/messageService';
import Button from '../../components/Button';
import Link from 'next/link';

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  
  // If today, show time
  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  // If this year, show month and day
  if (date.getFullYear() === now.getFullYear()) {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }
  
  // Otherwise, show full date
  return date.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
};

type Conversation = {
  user: {
    _id: string;
    name: string;
    avatar: string;
    airline?: string;
    position?: string;
  };
  latestMessage?: {
    content: string;
    createdAt: string;
    sender: string;
    read: boolean;
  };
  unreadCount: number;
};

type Message = {
  _id: string;
  content: string;
  sender: {
    _id: string;
    name: string;
    avatar: string;
  };
  receiver: {
    _id: string;
    name: string;
    avatar: string;
  };
  property?: {
    _id: string;
    title: string;
  };
  read: boolean;
  createdAt: string;
};

export default function MessagesPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading } = useContext(AuthContext);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUserName, setSelectedUserName] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch conversations on mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchConversations();
    } else if (!authLoading) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, authLoading, router]);

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Mark messages as read when selecting a conversation
  useEffect(() => {
    if (selectedUserId) {
      markMessagesAsRead();
      
      // Update unread count for selected conversation
      setConversations(conversations.map(conv => 
        conv.user._id === selectedUserId 
        ? { ...conv, unreadCount: 0 } 
        : conv
      ));
    }
  }, [selectedUserId]);

  // Fetch conversations
  const fetchConversations = async () => {
    try {
      setLoading(true);
      const response = await messageService.getConversations();
      
      if (response.success) {
        setConversations(response.data);
        
        // If there are conversations, select the first one
        if (response.data.length > 0 && !selectedUserId) {
          setSelectedUserId(response.data[0].user._id);
          setSelectedUserName(response.data[0].user.name);
          fetchMessages(response.data[0].user._id);
        } else if (selectedUserId) {
          // If already have a selected user, refresh messages
          fetchMessages(selectedUserId);
        } else {
          setLoading(false);
        }
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
      setLoading(false);
    }
  };

  // Fetch messages for a specific user
  const fetchMessages = async (userId: string) => {
    try {
      setLoading(true);
      const response = await messageService.getMessagesByUser(userId);
      
      if (response.success) {
        setMessages(response.data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  // Mark messages as read
  const markMessagesAsRead = async () => {
    if (!selectedUserId) return;
    
    try {
      await messageService.markAsRead(selectedUserId);
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  // Send a message
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedUserId || !newMessage.trim()) return;
    
    try {
      setSendingMessage(true);
      setError(null);
      
      const response = await messageService.sendMessage({
        receiver: selectedUserId,
        content: newMessage
      });
      
      if (response.success) {
        setNewMessage('');
        // Add the new message to the list
        setMessages([...messages, response.data]);
        // Update conversation list to show latest message
        updateConversationWithNewMessage(response.data);
      }
    } catch (error: any) {
      console.error('Error sending message:', error);
      setError(error.message || 'Failed to send message');
    } finally {
      setSendingMessage(false);
    }
  };

  // Update conversation list with new message
  const updateConversationWithNewMessage = (message: Message) => {
    const updatedConversations = [...conversations];
    const conversationIndex = updatedConversations.findIndex(
      conv => conv.user._id === (
        message.sender._id === user?._id 
        ? message.receiver._id 
        : message.sender._id
      )
    );
    
    if (conversationIndex !== -1) {
      // Update existing conversation
      updatedConversations[conversationIndex] = {
        ...updatedConversations[conversationIndex],
        latestMessage: {
          content: message.content,
          createdAt: message.createdAt,
          sender: message.sender._id,
          read: message.read
        }
      };
      
      // Move this conversation to the top
      const [conversation] = updatedConversations.splice(conversationIndex, 1);
      updatedConversations.unshift(conversation);
    } else {
      // Create new conversation
      const otherUser = message.sender._id === user?._id 
        ? message.receiver 
        : message.sender;
        
      updatedConversations.unshift({
        user: otherUser,
        latestMessage: {
          content: message.content,
          createdAt: message.createdAt,
          sender: message.sender._id,
          read: message.read
        },
        unreadCount: 0
      });
    }
    
    setConversations(updatedConversations);
  };

  // Select a conversation
  const selectConversation = (conversation: Conversation) => {
    setSelectedUserId(conversation.user._id);
    setSelectedUserName(conversation.user.name);
    fetchMessages(conversation.user._id);
  };

  // Check if the user has active conversations
  const hasConversations = conversations.length > 0;

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
        <p className="text-gray-600">
          Contact and communicate with hosts and other aviation professionals
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Conversations list */}
        <div className="md:col-span-1 border rounded-lg overflow-hidden h-[calc(100vh-240px)]">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <h2 className="font-medium text-gray-700">Conversations</h2>
          </div>

          <div className="overflow-y-auto h-[calc(100%-56px)]">
            {loading && !hasConversations && (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            )}

            {!loading && !hasConversations && (
              <div className="text-center p-6">
                <div className="inline-block p-3 bg-blue-50 rounded-full mb-2">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-gray-500 mb-4">No conversations yet</p>
                <p className="text-sm text-gray-500">
                  Start a conversation by contacting a host on a property listing page.
                </p>
              </div>
            )}

            {hasConversations && (
              <ul>
                {conversations.map((conversation) => (
                  <li 
                    key={conversation.user._id} 
                    className={`border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedUserId === conversation.user._id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => selectConversation(conversation)}
                  >
                    <div className="p-4">
                      <div className="flex items-center mb-1">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-semibold mr-3">
                          {conversation.user.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-900 truncate">
                              {conversation.user.name}
                            </h3>
                            {conversation.latestMessage && (
                              <span className="text-xs text-gray-500">
                                {formatDate(conversation.latestMessage.createdAt)}
                              </span>
                            )}
                          </div>
                          {conversation.user.airline && (
                            <p className="text-xs text-gray-500">
                              {conversation.user.airline} {conversation.user.position ? `• ${conversation.user.position}` : ''}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {conversation.latestMessage && (
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm text-gray-600 truncate max-w-[calc(100%-40px)]">
                            {conversation.latestMessage.sender === user?._id && 'You: '}
                            {conversation.latestMessage.content}
                          </p>
                          {conversation.unreadCount > 0 && (
                            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-600 rounded-full">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="md:col-span-2 border rounded-lg overflow-hidden h-[calc(100vh-240px)] flex flex-col">
          {selectedUserId ? (
            <>
              {/* Message header */}
              <div className="bg-gray-50 px-4 py-3 border-b">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-semibold mr-3">
                    {selectedUserName.charAt(0)}
                  </div>
                  <h2 className="font-medium text-gray-700">{selectedUserName}</h2>
                </div>
              </div>

              {/* Messages list */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {loading && (
                  <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                )}

                {!loading && messages.length === 0 && (
                  <div className="text-center p-6">
                    <p className="text-gray-500">No messages yet</p>
                    <p className="text-sm text-gray-500 mt-1">Send a message to start the conversation</p>
                  </div>
                )}

                {messages.map((message) => {
                  const isSender = message.sender._id === user?._id;
                  return (
                    <div 
                      key={message._id} 
                      className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[75%] rounded-lg px-4 py-2 ${
                          isSender 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {message.property && (
                          <div className={`text-xs mb-1 ${isSender ? 'text-blue-200' : 'text-gray-500'}`}>
                            Re: {message.property.title}
                          </div>
                        )}
                        <p>{message.content}</p>
                        <div className={`text-xs mt-1 ${isSender ? 'text-blue-200' : 'text-gray-500'}`}>
                          {formatDate(message.createdAt)}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Message input */}
              <div className="border-t p-4">
                <form onSubmit={sendMessage} className="flex items-center space-x-2">
                  <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    disabled={sendingMessage}
                  />
                  <Button
                    type="submit"
                    disabled={!newMessage.trim() || sendingMessage}
                    isLoading={sendingMessage}
                  >
                    Send
                  </Button>
                </form>
                {error && (
                  <p className="text-red-500 text-sm mt-2">{error}</p>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <div className="inline-block p-4 bg-blue-50 rounded-full mb-3">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No Conversation Selected</h3>
              <p className="text-gray-500 mb-6">
                {hasConversations 
                  ? 'Select a conversation from the list to view messages'
                  : 'You haven\'t started any conversations yet'}
              </p>
              <Link href="/properties">
                <Button variant="primary">Browse Properties</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
