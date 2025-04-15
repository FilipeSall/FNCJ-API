import express from 'express';
import userRoutes from './routes/userRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(userRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});