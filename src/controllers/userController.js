import {
    createUser,
    listAllUsers,
    getUserByEmail,
    getUserByEmailInstitucional,
    getUserByCpf,
    updateUserById,
    deleteUserById
} from '../models/userModel.js';
import { validateUserRequiredFields } from '../utils/validateRequiredFields.js';
import { validate as isUuid } from 'uuid';
import { parse, isValid } from 'date-fns';

// POST /users
export const addUser = async (req, res) => {
    try {
        console.log('Iniciando criação de usuário');
        const userData = req.body;
        console.log('Dados recebidos:', userData);

        // Validação de campos obrigatórios
        const missingFields = validateUserRequiredFields(userData);
        console.log('Campos faltantes:', missingFields);

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Campos obrigatórios ausentes',
                details: {
                    missingFields,
                    message: `Os seguintes campos são obrigatórios: ${missingFields.join(', ')}`
                }
            });
        }

        // Validação de e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userData.emailPessoal)) {
            return res.status(400).json({
                success: false,
                message: 'Formato de e-mail pessoal inválido',
                details: { field: 'emailPessoal' }
            });
        }

        if (!emailRegex.test(userData.emailInstitucional)) {
            return res.status(400).json({
                success: false,
                message: 'Formato de e-mail institucional inválido',
                details: { field: 'emailInstitucional' }
            });
        }

        // Validação de CPF
        const cpfLimpo = userData.cpf.replace(/\D/g, '');
        if (cpfLimpo.length !== 11) {
            return res.status(400).json({
                success: false,
                message: 'Formato de CPF inválido',
                details: { field: 'cpf' }
            });
        }

        // Validação de senha
        const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
        if (!senhaRegex.test(userData.senha)) {
            return res.status(400).json({
                success: false,
                message: 'Senha inválida. Deve conter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial',
                details: { field: 'senha' }
            });
        }

        // Validação da data de nascimento
        const dataNascimento = parse(userData.dataNascimento, 'yyyy-MM-dd', new Date());
        if (!isValid(dataNascimento)) {
            return res.status(400).json({
                success: false,
                message: 'Data de nascimento inválida',
                details: { field: 'dataNascimento' }
            });
        }

        // Validação de instituição
        if (!userData.instituicaoId) {
            return res.status(400).json({
                success: false,
                message: 'ID da instituição é obrigatório',
                details: { field: 'instituicaoId' }
            });
        }

        console.log('Dados validados, tentando criar usuário');
        console.log('Dados para criação:', userData);

        const newUser = await createUser(userData);
        console.log('Usuário criado com sucesso:', newUser);

        return res.status(201).json({
            success: true,
            message: 'Usuário criado com sucesso',
            user: newUser
        });

    } catch (error) {
        console.error('Erro detalhado ao criar usuário:', {
            message: error.message,
            code: error.code,
            stack: error.stack,
            meta: error.meta
        });

        if (error.code === 'P2002') {
            return res.status(409).json({
                success: false,
                message: 'Já existe um usuário com o mesmo valor em um campo único.',
                details: {
                    field: error.meta?.target?.[0] || 'campo desconhecido',
                    prismaCode: error.code
                }
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Erro interno do servidor ao criar usuário.',
            details: {
                error: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
            }
        });
    }
};


// GET /users
export const getAllUsers = async (_req, res) => {
    try {
        const users = await listAllUsers();
        return res.status(200).json({
            success: true,
            data: { count: users.length, users }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Erro ao listar usuários' });
    }
};

// GET /users/email/:email
export const findUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await getUserByEmail(email);
        if (!user) return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
        return res.status(200).json({ success: true, user });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Erro interno' });
    }
};

// GET /users/email-institucional/:email
export const findUserByEmailInstitucional = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await getUserByEmailInstitucional(email);
        if (!user) return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
        return res.status(200).json({ success: true, user });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Erro interno' });
    }
};

// GET /users/cpf/:cpf
export const findUserByCpf = async (req, res) => {
    try {
        const { cpf } = req.params;
        const user = await getUserByCpf(cpf);
        if (!user) return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
        return res.status(200).json({ success: true, user });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Erro interno' });
    }
};

// PUT /users/:id
export const editUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!isUuid(id)) {
            return res.status(400).json({ success: false, message: 'ID inválidol.' });
        }
        const data = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: 'Parâmetro id é obrigatório' });
        }
        if (Object.keys(data).length === 0) {
            return res.status(400).json({ success: false, message: 'Nenhum campo para atualizar' });
        }

        // Validações dos campos que estão sendo atualizados
        if (data.emailPessoal) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.emailPessoal)) {
                return res.status(400).json({
                    success: false,
                    message: 'Formato de e-mail inválido',
                    details: { field: 'emailPessoal' }
                });
            }
        }

        if (data.cpf) {
            const cpfRegex = /^\d{11}$/;
            if (!cpfRegex.test(data.cpf.replace(/\D/g, ''))) {
                return res.status(400).json({
                    success: false,
                    message: 'Formato de CPF inválido',
                    details: { field: 'cpf' }
                });
            }
        }

        if (data.senha) {
            const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
            if (!senhaRegex.test(data.senha)) {
                return res.status(400).json({
                    success: false,
                    message: 'Senha inválida',
                    details: { field: 'senha' }
                });
            }
        }

        const updated = await updateUserById(id, data);
        return res.status(200).json({
            success: true,
            message: 'Usuário atualizado com sucesso',
            user: updated
        });

    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
        }
        if (error.code === 'P2002') {
            return res.status(409).json({
                success: false,
                message: 'Conflito de dados únicos',
                details: { field: error.meta?.target[0] }
            });
        }
        return res.status(500).json({ success: false, message: 'Erro interno do servidor' });
    }
};

// DELETE /users/:id
export const removeUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!isUuid(id || !id)) {
            return res.status(400).json({ success: false, message: 'ID inválido, seu inútil.' });
        }

        await deleteUserById(id);
        return res.status(200).json({
            success: true,
            message: 'Usuário excluído com sucesso'
        });

    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
        }
        return res.status(500).json({ success: false, message: 'Erro interno do servidor' });
    }
};