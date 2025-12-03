import 'dotenv/config';
import app from './app';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚗 DiriJá Backend running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
  console.log(`📝 Instructor API: http://localhost:${PORT}/api/instructors`);
});
