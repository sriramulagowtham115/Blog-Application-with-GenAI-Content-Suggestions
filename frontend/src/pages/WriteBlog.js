import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function WriteBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const [aiData, setAiData] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);

  // Load blog when editing
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/blogs/${id}`)
        .then((res) => {
          setTitle(res.data.title);
          setContent(res.data.content);
          setAuthor(res.data.author);
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  // Save blog
  const handleSubmit = async () => {
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/blogs/${id}`, {
          title,
          content,
          author,
        });
      } else {
        await axios.post("http://localhost:5000/api/blogs", {
          title,
          content,
          author,
        });
      }

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  // Generate AI suggestions
  const handleGenerateAI = async () => {
    try {
      setLoadingAI(true);

      const res = await axios.post(
        "http://localhost:5000/api/ai-suggestions",
        { title, content }
      );

      setAiData(res.data.suggestions);
    } catch (err) {
      console.error("AI error:", err);
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="container-editor">
      {/* LEFT SIDE */}
      <div className="editor-left">
        <h1>{id ? "Edit Post" : "Write a New Post"}</h1>

        <label>Title</label>
        <input
          placeholder="Your post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Author</label>
        <input
          placeholder="Your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <label>Content</label>
        <textarea
          placeholder="Start writing your post..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button className="publish-btn" onClick={handleSubmit}>
          {id ? "Update Post" : "Publish Post"}
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="editor-right">
        <div className="ai-box">
          <div className="ai-header">
            <strong>✨ AI Suggestions</strong>
            <button
              className="ai-generate"
              onClick={handleGenerateAI}
              disabled={loadingAI}
            >
              {loadingAI ? "Generating..." : "Generate"}
            </button>
          </div>

          <p style={{ fontSize: "13px", marginTop: "10px" }}>
            Click "Generate" to get AI-powered topic and intro suggestions.
          </p>

          {aiData && (
            <div style={{ marginTop: "15px", fontSize: "13px" }}>
              {aiData.topics && (
                <>
                  <strong>Topics:</strong>
                  <ul>
                    {aiData.topics.map((topic, index) => (
                      <li key={index}>{topic}</li>
                    ))}
                  </ul>
                </>
              )}

              {aiData.intro && (
                <>
                  <strong>Intro:</strong>
                  <p>{aiData.intro}</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WriteBlog;