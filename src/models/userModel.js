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


/* Obtém usuário por e-mail pessoal */
export async function getUserByEmail(email) {
    return prisma.user.findUnique({
        where: { emailPessoal: email },
        include: { instituicoes: true }
    });
}

/* Obtém usuário por e-mail institucional */
export async function getUserByEmailInstitucional(email) {
    return prisma.user.findUnique({
        where: { emailInstitucional: email },
        include: { instituicoes: true }
    });
}

/* Obtém usuário por CPF */
export async function getUserByCpf(cpf) {
    return prisma.user.findUnique({
        where: { cpf },
        include: { instituicoes: true }
    });
}

export { createUser, listAllUsers, getUserByCpf, getUserByEmailInstitucional };