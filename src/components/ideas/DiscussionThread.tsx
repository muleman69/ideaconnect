'use client';

import { useState } from 'react';
import { MessageCircle, Reply, Send } from 'lucide-react';

interface User {
  id: string;
  name: string;
  imageUrl: string;
}

interface Discussion {
  id: string;
  content: string;
  user: User;
  createdAt: string;
  replies: Discussion[];
}

interface DiscussionThreadProps {
  ideaId: string;
  discussions: Discussion[];
}

export default function DiscussionThread({ ideaId, discussions }: DiscussionThreadProps) {
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/ideas/${ideaId}/discussions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newComment.trim()
        }),
      });

      if (response.ok) {
        setNewComment('');
        // Refresh discussions
        window.location.reload();
      }
    } catch (error) {
      console.error('Failed to submit comment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim() || !replyTo) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/ideas/${ideaId}/discussions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: replyContent.trim(),
          parentId: replyTo
        }),
      });

      if (response.ok) {
        setReplyContent('');
        setReplyTo(null);
        // Refresh discussions
        window.location.reload();
      }
    } catch (error) {
      console.error('Failed to submit reply:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* New Discussion Form */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Start a Discussion</h3>
        <form onSubmit={handleSubmitComment}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts about this idea..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
            required
          />
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              disabled={loading || !newComment.trim()}
              className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
              {loading ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </form>
      </div>

      {/* Discussions */}
      <div className="space-y-6">
        {discussions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No discussions yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          discussions.map((discussion) => (
            <div key={discussion.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  {discussion.user.imageUrl ? (
                    <img
                      src={discussion.user.imageUrl}
                      alt={discussion.user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {discussion.user.name[0]}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-gray-900">
                      {discussion.user.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDate(discussion.createdAt)}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">{discussion.content}</p>
                  
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setReplyTo(replyTo === discussion.id ? null : discussion.id)}
                      className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      <Reply className="h-4 w-4" />
                      Reply
                    </button>
                    {discussion.replies.length > 0 && (
                      <span className="text-sm text-gray-500">
                        {discussion.replies.length} replies
                      </span>
                    )}
                  </div>

                  {/* Reply Form */}
                  {replyTo === discussion.id && (
                    <form onSubmit={handleSubmitReply} className="mt-4">
                      <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Write your reply..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        rows={3}
                        required
                      />
                      <div className="flex justify-end gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setReplyTo(null);
                            setReplyContent('');
                          }}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={loading || !replyContent.trim()}
                          className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? 'Replying...' : 'Reply'}
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Replies */}
                  {discussion.replies.length > 0 && (
                    <div className="mt-6 space-y-4">
                      {discussion.replies.map((reply) => (
                        <div key={reply.id} className="flex items-start gap-3 pl-4 border-l-2 border-gray-200">
                          <div className="w-8 h-8 rounded-full overflow-hidden">
                            {reply.user.imageUrl ? (
                              <img
                                src={reply.user.imageUrl}
                                alt={reply.user.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                                <span className="text-xs font-medium text-gray-600">
                                  {reply.user.name[0]}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-gray-900 text-sm">
                                {reply.user.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                {formatDate(reply.createdAt)}
                              </span>
                            </div>
                            <p className="text-gray-700 text-sm">{reply.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}