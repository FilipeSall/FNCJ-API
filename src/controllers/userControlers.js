import { createUser, listAllUsers } from '../models/userModels.js';

// Controlador para adicionar um usuário
export const addUser = async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await createUser(userData);
        res.status(201).json({ message: 'Usuário criado com sucesso', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
    }
};

// Controlador para listar todos os usuários
export const getAllUsers = async (req, res) => {
    try {
        const users = await listAllUsers();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar usuários', error: error.message });
    }
};