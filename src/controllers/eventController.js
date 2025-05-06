import { createEvento } from '../models/eventModel.js';

/**
 * Controlador para adicionar um novo evento
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 */
export const addEvento = async (req, res) => {
    try {
        const eventoData = req.body;

        // Verificar se o nome foi fornecido (campo mínimo obrigatório)
        if (!eventoData.nome || !eventoData.nome.trim()) {
            return res.status(400).json({
                success: false,
                message: 'O nome do evento é obrigatório'
            });
        }

        // Tratar o formato dos preços (se fornecidos)
        const precosCampos = [
            'precoLote1Filiado', 'precoLote1NaoFiliado', 'precoLote1Estudante',
            'precoLote2Filiado', 'precoLote2NaoFiliado', 'precoLote2Estudante',
            'precoLote3Filiado', 'precoLote3NaoFiliado', 'precoLote3Estudante',
            'precoEmpenhoFiliado', 'precoEmpenhoNaoFiliado', 'precoEmpenhoEstudante'
        ];

        precosCampos.forEach(campo => {
            if (eventoData[campo]) {
                eventoData[campo] = parseFloat(eventoData[campo]);
            }
        });

        // Criar o evento
        const novoEvento = await createEvento(eventoData);

        return res.status(201).json({
            success: true,
            message: 'Evento criado com sucesso',
            evento: novoEvento
        });
    } catch (error) {
        console.error('Erro no controller ao criar evento:', error);

        // Tratamento de erros específicos
        if (error.message.includes('nome do evento não pode ter mais')) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        if (error.message.includes('data') || 
            error.message.includes('lote') || 
            error.message.includes('forma de pagamento')) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        if (error.code === 'P2002') {
            return res.status(409).json({
                success: false,
                message: 'Conflito: dados duplicados detectados'
            });
        }

        if (error.code === 'P2003') {
            return res.status(400).json({
                success: false,
                message: 'O prêmio informado não existe'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Erro interno ao criar evento'
        });
    }
};