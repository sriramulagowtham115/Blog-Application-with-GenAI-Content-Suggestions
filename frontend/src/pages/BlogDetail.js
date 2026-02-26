import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/blogs/${id}`)
      .then((res) => setBlog(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/api/blogs/${id}`);
    navigate("/");
  };

  if (!blog) return <div className="detail-container">Loading...</div>;

  return (
    <div className="detail-container">
      <h1 className="detail-title">{blog.title}</h1>

      <div className="detail-meta">
        <span>By {blog.author}</span>
        <span> · {new Date(blog.created_at).toDateString()}</span>
      </div>

      <div className="detail-content">{blog.content}</div>

      <div className="detail-actions">
        <button
          className="edit-btn"
          onClick={() => navigate(`/edit/${id}`)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default BlogDetail;