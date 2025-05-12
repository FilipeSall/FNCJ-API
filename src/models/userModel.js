import prisma from '../utils/prismaClient.js';
import { parse } from 'date-fns';

// Função para criar um usuário
export async function createUser(userData) {
    try {
        console.log('Iniciando criação no modelo');
        console.log('Dados recebidos no modelo:', userData);

        const { instituicaoId, ...rest } = userData;

        // Tratamento da data de nascimento
        const dataNascimento = parse(rest.dataNascimento, 'yyyy-MM-dd', new Date());
        const dataExpedicaoRG = parse(rest.dataExpedicaoRG, 'yyyy-MM-dd', new Date());

        // Limpeza de campos formatados
        const cpfLimpo = rest.cpf.replace(/\D/g, '');
        const cepLimpo = rest.cep.replace(/\D/g, '');
        const telefoneLimpo = rest.telefone.replace(/\D/g, '');

        const dadosProcessados = {
            ...rest,
            cpf: cpfLimpo,
            cep: cepLimpo,
            telefone: telefoneLimpo,
            dataNascimento: dataNascimento,
            dataExpedicaoRG: dataExpedicaoRG,
            instituicaoId: Number(instituicaoId)
        };

        console.log('Dados processados para criação:', dadosProcessados);

        const user = await prisma.user.create({
            data: dadosProcessados,
            include: { instituicao: true }
        });

        console.log('Usuário criado com sucesso no banco:', user);
        return user;

    } catch (error) {
        console.error('Erro na criação do usuário no modelo:', {
            message: error.message,
            code: error.code,
            stack: error.stack,
            meta: error.meta
        });
        throw error;
    }
}

// Função para listar todos os usuários
export async function listAllUsers() {
    try {
        const users = await prisma.user.findMany({
            include: {
                instituicao: true,
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
        include: { instituicao: true }
    });
}

// Obtém usuário por e-mail institucional
export async function getUserByEmailInstitucional(email) {
    return prisma.user.findUnique({
        where: { emailInstitucional: email },
        include: { instituicao: true }
    });
}

// Obtém usuário por CPF
export async function getUserByCpf(cpf) {
    return prisma.user.findUnique({
        where: { cpf },
        include: { instituicao: true }
    });
}

// Atualiza um usuário pelo ID
export async function updateUserById(id, dataToUpdate) {
    try {
        const user = await prisma.user.update({
            where: { id },
            data: dataToUpdate,
            include: { instituicao: true }
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