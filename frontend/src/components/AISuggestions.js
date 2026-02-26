import axios from "axios";
import { useState } from "react";

function AISuggestions({ title, content }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/ai-suggestions",
        { title, content }
      );

      setData(res.data.suggestions);
    } catch (err) {
      alert("AI failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <button onClick={generate}>
        {loading ? "Generating..." : "Generate AI Suggestions"}
      </button>

      {data && (
        <>
          <h3>Related Topics</h3>
          <ul>
            {data.topics.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>

          <h3>Intro Suggestion</h3>
          <p>{data.intro}</p>
        </>
      )}
    </div>
  );
}

export default AISuggestions;