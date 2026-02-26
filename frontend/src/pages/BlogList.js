import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/blogs")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">Latest Posts</h1>
      <p className="home-subtitle">
        Thoughts, ideas, and stories from our community.
      </p>

      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="featured-post"
          onClick={() => navigate(`/blog/${blog.id}`)}
        >
          <h2 className="post-title">{blog.title}</h2>

          <p className="post-preview">
            {blog.content.substring(0, 180)}...
          </p>

          <div className="post-meta">
            {blog.author} · {new Date(blog.created_at).toDateString()}
          </div>

          <hr className="post-divider" />
        </div>
      ))}
    </div>
  );
}

export default BlogList;