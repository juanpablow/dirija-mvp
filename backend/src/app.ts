import 'dotenv/config';
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import instructorRoutes from './routes/instructor.routes';

const app: Application = express();

// CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({ 
    status: 'ok', 
    message: 'DiriJá API is running',
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use('/api/instructors', instructorRoutes);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Rota não encontrada',
  });
});

// Error handling middleware
interface ApiError extends Error {
  status?: number;
}

app.use((err: ApiError, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', err);
  
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Erro interno do servidor',
  });
});

export default app;
