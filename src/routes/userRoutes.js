import express from 'express';
import {
    addUser,
    getAllUsers,
    findUserByEmail,
    findUserByEmailInstitucional,
    findUserByCpf
} from '../controllers/userController.js';

const router = express.Router();

router.post('/users', addUser);
router.get('/users', getAllUsers);
router.get('/users/email/:email', findUserByEmail);
router.get('/users/email-institucional/:email', findUserByEmailInstitucional);
router.get('/users/cpf/:cpf', findUserByCpf);

export default router;