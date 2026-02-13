const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require('./src/routes/auth');
const taskRoutes = require('./src/routes/task');
const annotationRoutes = require('./src/routes/annotation');
const walletRoutes = require('./src/routes/wallet');
const userRoutes = require('./src/routes/user');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/annotations', annotationRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/user', userRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend service is running' });
});

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, '../dist')));

// Handle SPA - all routes that don't match API routes should serve index.html
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;