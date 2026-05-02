const express = require('express');
const mysql = require('mysql2');

const app = express();

/* ===== MIDDLEWARE ===== */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

/* ===== DATABASE CONNECTION ===== */
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // сложи парола, ако имаш
  database: 'fittrack'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

/* ===== TEST ROUTE ===== */
app.get('/', (req, res) => {
  res.send('FitTrack backend is running with MySQL');
});

/* ===== READ WORKOUTS ===== */
app.get('/api/workouts', (req, res) => {
  const sql = 'SELECT * FROM workouts';

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

/* ===== CREATE WORKOUT ===== */
app.post('/api/workouts', (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Missing request body' });
  }

  const {
    workout_name,
    description,
    duration_minutes,
    calories_per_minute
  } = req.body;

  const sql = `
    INSERT INTO workouts
    (workout_name, description, duration_minutes, calories_per_minute)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [workout_name, description, duration_minutes, calories_per_minute],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({
        message: 'Workout added',
        id: result.insertId
      });
    }
  );
});

/* ===== UPDATE WORKOUT ===== */
app.put('/api/workouts/:id', (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Missing request body' });
  }

  const {
    workout_name,
    description,
    duration_minutes,
    calories_per_minute
  } = req.body;

  const { id } = req.params;

  const sql = `
    UPDATE workouts
    SET workout_name = ?,
        description = ?,
        duration_minutes = ?,
        calories_per_minute = ?
    WHERE workout_id = ?
  `;

  db.query(
    sql,
    [workout_name, description, duration_minutes, calories_per_minute, id],
    err => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Workout updated' });
    }
  );
});

/* ===== DELETE WORKOUT ===== */
app.delete('/api/workouts/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM workouts WHERE workout_id = ?';

  db.query(sql, [id], err => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Workout deleted' });
  });
});

/* ===== START SERVER ===== */
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});