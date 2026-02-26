const express = require("express");
const router = express.Router();

function generateTopics(baseText) {
  const keywords = baseText.split(" ").slice(0, 3).join(" ");

  return [
    `How ${keywords} is transforming modern development`,
    `Common mistakes developers make with ${keywords}`,
    `Future trends in ${keywords}`,
    `Practical guide to mastering ${keywords}`
  ].sort(() => 0.5 - Math.random()).slice(0, 2);
}

function generateIntro(baseText) {
  const templates = [
    `In today's fast-evolving tech landscape, ${baseText} plays a crucial role in shaping modern solutions. Understanding its fundamentals and practical applications can significantly improve development efficiency and innovation.`,
    
    `${baseText} has become increasingly important in recent years. From startups to enterprise systems, its influence continues to grow, making it essential for developers and creators to understand its core principles.`,
    
    `As technology advances, ${baseText} stands out as a powerful concept that drives performance and scalability. In this article, we explore its key ideas and practical benefits.`
  ];

  return templates[Math.floor(Math.random() * templates.length)];
}

router.post("/", (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title && !content) {
      return res.status(400).json({
        error: "Please provide title or content"
      });
    }

    const baseText = title || content;

    const suggestions = {
      topics: generateTopics(baseText),
      intro: generateIntro(baseText)
    };

    res.json({ suggestions });

  } catch (error) {
    console.error("AI ERROR:", error.message);
    res.status(500).json({ error: "AI generation failed" });
  }
});

module.exports = router;