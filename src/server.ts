import express from 'express';
import cors from 'cors';
import { AppDataSource } from './config/data-source';
import projectRoutes from './routes/project.routes';
import { savedRoutes } from './routes/savedProject.route';

const app = express(); // ✅ Moved this up
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/saved', savedRoutes); // ✅ Moved this after app is defined

// Connect to DB and start server
AppDataSource.initialize()
  .then(() => {
    console.log('✅ Connected to MySQL DB');
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error: unknown) => console.error('❌ DB connection error:', error));
