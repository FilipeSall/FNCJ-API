import { createInstituicao, listAllInstituicoes } from '../models/instituicaoModel.js';

export const addInstituicao = async (req, res) => {
    try {
        const { nome } = req.body;

        if (!nome || !nome.trim()) {
            return res.status(400).json({
                success: false,
                message: 'Campo "nome" é obrigatório'
            });
        }

        const novaInstituicao = await createInstituicao({ nome: nome.trim() });

        return res.status(201).json({
            success: true,
            message: 'Instituição criada com sucesso',
            instituicao: novaInstituicao
        });
    } catch (error) {
        if (error.code === 'P2002') {
            // violação de unique
            return res.status(409).json({
                success: false,
                message: 'Já existe uma instituição com esse nome'
            });
        }
        return res.status(500).json({
            success: false,
            message: 'Erro interno ao criar instituição'
        });
    }
};

export const getAllInstituicoes = async (_req, res) => {
    try {
        const instituicoes = await listAllInstituicoes();
        return res.status(200).json({
            success: true,
            data: {
                count: instituicoes.length,
                instituicoes
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Erro ao listar instituições'
        });
    }
};