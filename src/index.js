import express from 'express';
import userRoutes from './routes/userRoutes.js';
import instituicaoRoutes from './routes/instituicaoRoutes.js';

const app = express();
app.use(express.json());

app.use('/api/v1', userRoutes);
app.use('/api/v1', instituicaoRoutes);

app.listen(3000, () => console.log('API rodando em http://localhost:3000'));