import prisma from '../utils/prismaClient.js';

// Função para criar um usuário
export async function createUser(userData) {

    const { instituicoes, ...rest } = userData;

    const user = await prisma.user.create({
        data: {
            ...rest,
            instituicoes: {
                connect: instituicoes.map((id) => ({ id: Number(id) }))
            }
        },
        include: { instituicoes: true }
    });
    return user;
}

// Função para listar todos os usuários
export async function listAllUsers() {
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

// Obtém usuário por e-mail pessoal
export async function getUserByEmail(email) {
    return prisma.user.findUnique({
        where: { emailPessoal: email },
        include: { instituicoes: true }
    });
}

// Obtém usuário por e-mail institucional
export async function getUserByEmailInstitucional(email) {
    return prisma.user.findUnique({
        where: { emailInstitucional: email },
        include: { instituicoes: true }
    });
}

// Obtém usuário por CPF
export async function getUserByCpf(cpf) {
    return prisma.user.findUnique({
        where: { cpf },
        include: { instituicoes: true }
    });
}

// Atualiza um usuário pelo ID
export async function updateUserById(id, dataToUpdate) {
    try {
        const user = await prisma.user.update({
            where: { id },
            data: dataToUpdate,
            include: { instituicoes: true }
        });
        return user;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

// Deleta um usuário pelo ID
export async function deleteUserById(id) {
    try {
        const user = await prisma.user.delete({
            where: { id }
        });
        return user;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}