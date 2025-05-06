import express from 'express';
import userRoutes from './routes/userRoutes.js';
import instituicaoRoutes from './routes/instituicaoRoutes.js';
import eventRoutes from './routes/eventoRoutes.js';
import cors from 'cors';        

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/v1', userRoutes);
app.use('/api/v1', instituicaoRoutes);
app.use('/api/v1', eventRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`API ouvindo na porta ${PORT}`);
});