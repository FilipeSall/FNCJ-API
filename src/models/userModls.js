import prisma from '../utils/prismaClient.js';

// Função para criar um usuário
async function createUser(userData) {
    try {
        const user = await prisma.user.create({
            data: userData,
        });
        return user;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

// Função para listar todos os usuários
async function listAllUsers() {
    try {
        const users = await prisma.user.findMany({
            include: {
                instituicoes: true,
            },
        });
        return users;
    } catch (error) {
        console.error('Error listing users:', error);
        throw error;
    }
}

export { createUser, listAllUsers };