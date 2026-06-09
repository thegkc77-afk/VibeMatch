import { useState, useRef } from 'react';
import { Image as ImageIcon, Plus, MoreVertical, Heart, MessageCircle } from 'lucide-react';
import '../WebStyle/explore.css';

function Explore() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: 'emma_explores',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80',
      location: 'Downtown Cafe District',
      distance: '1.2 km away',
      content: 'Loving the vibe here tonight! Highly recommend checking out the new craft cocktails. 🍸✨',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
      likes: 24,
      commentsCount: 5,
      hasLiked: false
    },
    {
      id: 2,
      username: 'travel_bug',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
      location: 'Skyline Rooftop Bar',
      distance: '3.4 km away',
      content: 'Golden hour hits different from up here. Weekend starting right! 🌇🍻',
      image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=800&q=80',
      likes: 42,
      commentsCount: 12,
      hasLiked: false
    }
  ]);

  const [text, setText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
    }
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() && !selectedImage) return;

    const newPost = {
      id: Date.now(),
      username: 'alex_rivera',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
      location: 'Lakeside Lounge',
      distance: '0.2 km away',
      content: text,
      image: selectedImage || 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80', // Fallback cozy photo if no image chosen
      likes: 0,
      commentsCount: 0,
      hasLiked: false
    };

    setPosts([newPost, ...posts]);
    setText('');
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleLike = (id) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        return {
          ...post,
          likes: post.hasLiked ? post.likes - 1 : post.likes + 1,
          hasLiked: !post.hasLiked
        };
      }
      return post;
    }));
  };

  return (
    <div className="explore-container">
      {/* Top Creation Widget */}
      <form className="create-post-widget" onSubmit={handlePostSubmit}>
        <div className="upload-btn-container">
          <button 
            type="button" 
            className={`image-upload-btn ${selectedImage ? 'has-image' : ''}`} 
            onClick={handleImageClick}
            aria-label="Upload Image"
          >
            <ImageIcon size={20} />
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            style={{ display: 'none' }} 
          />
        </div>

        <input 
          type="text" 
          placeholder="Share what you are up to..." 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          className="post-input"
        />

        <button type="submit" className="post-submit-btn" aria-label="Publish Post">
          <Plus size={20} />
        </button>
      </form>

      {/* Selected Image Preview */}
      {selectedImage && (
        <div className="image-preview-container">
          <img src={selectedImage} alt="Upload preview" className="image-preview" />
          <button type="button" className="remove-preview-btn" onClick={() => setSelectedImage(null)}>✕</button>
        </div>
      )}

      {/* Feed Posts */}
      <div className="feed-container">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            {/* Header */}
            <div className="post-header">
              <div className="post-user-info">
                <img src={post.avatar} alt={post.username} className="post-avatar" />
                <div className="post-user-details">
                  <span className="post-username">{post.username}</span>
                  <span className="post-location">{post.location} • {post.distance}</span>
                </div>
              </div>
              <button className="post-more-btn" aria-label="More options">
                <MoreVertical size={18} />
              </button>
            </div>

            {/* Content text */}
            {post.content && (
              <div className="post-content-text">
                <p>{post.content}</p>
              </div>
            )}

            {/* Post Image */}
            {post.image && (
              <div className="post-image-container">
                <img src={post.image} alt="Post content" className="post-image" />
              </div>
            )}

            {/* Actions Footer */}
            <div className="post-footer">
              <div className="post-actions">
                <button 
                  className={`post-action-btn like-btn ${post.hasLiked ? 'liked' : ''}`} 
                  onClick={() => handleLike(post.id)}
                  aria-label="Like post"
                >
                  <Heart size={20} fill={post.hasLiked ? "#ec4899" : "none"} />
                  <span>{post.likes}</span>
                </button>
                <button className="post-action-btn" aria-label="Comment on post">
                  <MessageCircle size={20} />
                  <span>{post.commentsCount}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explore;