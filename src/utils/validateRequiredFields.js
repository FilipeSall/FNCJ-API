export const validateUserRequiredFields = (userData) => {
    const requiredFields = {
        nome: 'Nome',
        telefone: 'Telefone',
        emailPessoal: 'E-mail pessoal',
        cpf: 'CPF',
        rg: 'RG',
        orgaoEmissorRG: 'Órgão emissor do RG',
        dataNascimento: 'Data de nascimento',
        cep: 'CEP',
        uf: 'UF',
        cidade: 'Cidade',
        bairro: 'Bairro',
        logradouro: 'Logradouro',
        numero: 'Número',
        senha: 'Senha'
    };

    const missingFields = [];

    for (const [field, label] of Object.entries(requiredFields)) {
        if (!userData[field]) {
            missingFields.push(label);
        }
    }

    return missingFields;
};

/**
 * Verifica se o evento está completo (todos os campos necessários preenchidos)
 * @param {Object} data - Dados do evento
 * @returns {boolean} true se o evento estiver completo
 */
export function verificarEventoCompleto(data) {
    // Um evento é considerado completo quando todos os campos essenciais estão preenchidos
    const camposEssenciais = [
        'nome', 'sigla', 'dataInicio', 'dataFim', 'cidade', 'uf',
        'vencimentoLote1', 'precoLote1Filiado', 'precoLote1NaoFiliado', 'precoLote1Estudante',
        'formasPagamento'
    ];

    // Verificar se todos os campos essenciais estão preenchidos
    for (const campo of camposEssenciais) {
        // Casos especiais
        if (campo === 'formasPagamento') {
            if (!data[campo] || data[campo].length === 0) {
                return false;
            }
            continue;
        }

        // Para os demais campos, verificar se estão preenchidos
        if (!data[campo]) {
            return false;
        }
    }

    return true;
}


/**
 * Valida campos obrigatórios para criar um evento
 * @param {Object} data - Dados do evento
 * @throws {Error} Se campos obrigatórios não forem fornecidos
 */
export function validarEventoCamposObrigatorios(data) {
    // Nome é o único campo obrigatório para salvar um evento
    if (!data.nome) {
        throw new Error('O nome do evento é obrigatório');
    }

    // Validar limite de caracteres do nome
    if (data.nome.length > 100) {
        throw new Error('O nome do evento não pode ter mais de 100 caracteres');
    }

    // Validar datas (se fornecidas)
    if (data.dataInicio && data.dataFim) {
        const dataInicio = new Date(data.dataInicio);
        const dataFim = new Date(data.dataFim);

        if (dataFim < dataInicio) {
            throw new Error('A data de término não pode ser anterior à data de início');
        }
    }

    // Validar datas dos lotes (se fornecidas)
    if (data.vencimentoLote1 && data.vencimentoLote2) {
        const lote1 = new Date(data.vencimentoLote1);
        const lote2 = new Date(data.vencimentoLote2);

        if (lote2 < lote1) {
            throw new Error('A data de vencimento do 2º lote não pode ser anterior à do 1º lote');
        }

        if (data.vencimentoLote3) {
            const lote3 = new Date(data.vencimentoLote3);
            if (lote3 < lote2) {
                throw new Error('A data de vencimento do 3º lote não pode ser anterior à do 2º lote');
            }
        }
    }

    // Validar formas de pagamento (se preços informados)
    const temPreco = data.precoLote1Filiado ||
        data.precoLote1NaoFiliado ||
        data.precoLote1Estudante;

    if (temPreco && (!data.formasPagamento || data.formasPagamento.length === 0)) {
        throw new Error('É necessário informar pelo menos uma forma de pagamento');
    }
}