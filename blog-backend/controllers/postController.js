const db = require('../config/db');

exports.createPost = async (req, res) => {
  const { title, content, userId } = req.body;
  try {
    await db.execute(
      'INSERT INTO posts (title, content, author_id) VALUES (?, ?, ?)',
      [title, content, userId]
    );
    res.json({ msg: 'Post created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const [posts] = await db.execute(
      'SELECT posts.*, users.username FROM posts JOIN users ON posts.author_id = users.id ORDER BY created_at DESC'
    );
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
