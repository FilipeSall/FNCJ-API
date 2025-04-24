import express from 'express';
import userRoutes from './routes/userRoutes.js';
import instituicaoRoutes from './routes/instituicaoRoutes.js';

const app = express();
app.use(express.json());

app.use('/api/v1', userRoutes);
app.use('/api/v1', instituicaoRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`API ouvindo na porta ${PORT}`);
});