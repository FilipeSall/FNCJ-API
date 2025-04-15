import express from 'express';
import { addUser, getAllUsers } from '../controllers/userController.js';

const router = express.Router();

// Rota para adicionar um usuário
router.post('/users', addUser);

// Rota para listar todos os usuários
router.get('/users', getAllUsers);

export default router;