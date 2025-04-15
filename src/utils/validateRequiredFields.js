export const validateUserRequiredFields = (userData) => {
    const requiredFields = {
        nome: 'Nome',
        telefone: 'Telefone',
        emailPessoal: 'E-mail pessoal',
        cpf: 'CPF',
        rg: 'RG',
        orgaoEmissorRG: 'Órgão emissor do RG',
        ufEmissorRG: 'UF do órgão emissor',
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
