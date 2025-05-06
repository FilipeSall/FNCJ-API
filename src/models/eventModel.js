import prisma from '../utils/prismaClient.js';
import { verificarEventoCompleto, validarEventoCamposObrigatorios } from '../utils/validateRequiredFields.js';

/**
 * Cria um novo evento no sistema
 * @param {Object} data - Dados do evento a ser criado
 * @returns {Promise<Object>} Evento criado com suas relações
 */
export async function createEvento(data) {
    try {
        // Validar campos obrigatórios
        validarEventoCamposObrigatorios(data);

        // Verificar se o evento está completo
        const completo = verificarEventoCompleto(data);

        // Preparar dados para criação do evento
        const eventData = {
            nome: data.nome,
            sigla: data.sigla,
            dataInicio: data.dataInicio ? new Date(data.dataInicio) : null,
            dataFim: data.dataFim ? new Date(data.dataFim) : null,
            cidade: data.cidade,
            uf: data.uf,
            premioId: data.premioId,
            completo,

            // Campos de lotes e datas
            vencimentoLote1: data.vencimentoLote1 ? new Date(data.vencimentoLote1) : null,
            vencimentoLote2: data.vencimentoLote2 ? new Date(data.vencimentoLote2) : null,
            vencimentoLote3: data.vencimentoLote3 ? new Date(data.vencimentoLote3) : null,

            // Preços dos lotes
            precoLote1Filiado: data.precoLote1Filiado,
            precoLote1NaoFiliado: data.precoLote1NaoFiliado,
            precoLote1Estudante: data.precoLote1Estudante,
            precoLote2Filiado: data.precoLote2Filiado,
            precoLote2NaoFiliado: data.precoLote2NaoFiliado,
            precoLote2Estudante: data.precoLote2Estudante,
            precoLote3Filiado: data.precoLote3Filiado,
            precoLote3NaoFiliado: data.precoLote3NaoFiliado,
            precoLote3Estudante: data.precoLote3Estudante,

            // Preços para empenho
            precoEmpenhoFiliado: data.precoEmpenhoFiliado,
            precoEmpenhoNaoFiliado: data.precoEmpenhoNaoFiliado,
            precoEmpenhoEstudante: data.precoEmpenhoEstudante,

            // Data limite para filiação
            limiteFiliacao: data.limiteFiliacao ? new Date(data.limiteFiliacao) : null,

            // Links
            linkPesquisaOpiniao: data.linkPesquisaOpiniao,
            linkResultadosPesquisa: data.linkResultadosPesquisa,
        };

        // Usar transação para garantir integridade
        return await prisma.$transaction(async (tx) => {
            // Criar o evento
            const evento = await tx.evento.create({
                data: eventData
            });

            // Adicionar formas de pagamento
            if (data.formasPagamento && data.formasPagamento.length > 0) {
                // Criar registros na tabela de junção
                await Promise.all(
                    data.formasPagamento.map(formaPagamento =>
                        tx.eventoFormaPagamento.create({
                            data: {
                                eventoId: evento.id,
                                formaPagamento
                            }
                        })
                    )
                );
            }

            // Retornar evento completo com relações
            return await tx.evento.findUnique({
                where: { id: evento.id },
                include: {
                    formasPagamentoEvento: true,
                    premio: true
                }
            });
        });
    } catch (error) {
        console.error('Erro ao criar evento:', error);
        throw error;
    }
}

