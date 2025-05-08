import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from './Button';
import AuthContext from '../context/AuthContext';
import messageService from '../services/messageService';

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  hostId: string;
  hostName: string;
  propertyId?: string;
  propertyTitle?: string;
}

const MessageModal: React.FC<MessageModalProps> = ({
  isOpen,
  onClose,
  hostId,
  hostName,
  propertyId,
  propertyTitle
}) => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { user, isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      // Reset state when modal opens
      setMessage('');
      setError(null);
      setSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    
    if (!message.trim()) {
      setError('Please enter a message');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      const data: {
        receiver: string;
        content: string;
        propertyId?: string;
      } = {
        receiver: hostId,
        content: message
      };
      
      if (propertyId) {
        data.propertyId = propertyId;
      }
      
      await messageService.sendMessage(data);
      
      setSuccess(true);
      setMessage('');
      
      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);
    } catch (err: any) {
      console.error('Error sending message:', err);
      setError(err.message || 'Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Contact {hostName}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          
          {propertyTitle && (
            <div className="mb-4 bg-blue-50 p-3 rounded-md">
              <p className="text-sm text-blue-600">
                About: <span className="font-medium">{propertyTitle}</span>
              </p>
            </div>
          )}
          
          {!isAuthenticated ? (
            <div className="mb-4 bg-yellow-50 p-4 rounded-md">
              <p className="text-sm text-yellow-700">
                Please <button 
                  className="font-medium text-blue-600 hover:underline" 
                  onClick={() => router.push('/auth/login')}
                >
                  log in
                </button> to contact the host.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="mb-4 bg-red-50 p-3 rounded-md">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
              
              {success && (
                <div className="mb-4 bg-green-50 p-3 rounded-md">
                  <p className="text-sm text-green-600">Message sent successfully!</p>
                </div>
              )}
              
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={isSubmitting || success}
                  maxLength={500}
                />
                <p className="mt-1 text-sm text-gray-500">
                  {500 - message.length} characters remaining
                </p>
              </div>
              
              <div className="flex justify-end gap-3">
                <Button 
                  variant="secondary" 
                  onClick={onClose} 
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  type="submit" 
                  disabled={isSubmitting || !message.trim() || success}
                  isLoading={isSubmitting}
                >
                  Send Message
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
