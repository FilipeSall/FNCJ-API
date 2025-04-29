import express from 'express';
import {
    addUser,
    getAllUsers,
    findUserByEmail,
    findUserByEmailInstitucional,
    findUserByCpf,
    editUser,
    removeUser
} from '../controllers/userController.js';

const router = express.Router();

router.post('/users', addUser);
router.get('/users', getAllUsers);
router.get('/users/email/:email', findUserByEmail);
router.get('/users/email-institucional/:email', findUserByEmailInstitucional);
router.get('/users/cpf/:cpf', findUserByCpf);
router.put('/users/:id', editUser);
router.delete('/users/:id', removeUser);

export default router;