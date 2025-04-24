import prisma from '../utils/prismaClient.js';

/* Cria uma instituição */
export async function createInstituicao(data) {
    try {
        const instituicao = await prisma.instituicao.create({ data });
        return instituicao;
    } catch (error) {
        console.error('Erro ao criar instituição:', error);
        throw error;
    }
}

/* Lista todas as instituições */
export async function listAllInstituicoes() {
    try {
        return await prisma.instituicao.findMany({
            include: { users: true } 
        });
    } catch (error) {
        console.error('Erro ao listar instituições:', error);
        throw error;
    }
}