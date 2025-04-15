import { createUser, listAllUsers } from '../models/userModel.js';
import { validateUserRequiredFields } from '../utils/validateRequiredFields.js';

// Controlador para adicionar um usuário
export const addUser = async (req, res) => {
    try {
        const userData = req.body;

        const missingFields = validateUserRequiredFields(userData);
        
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

        // Validação de formato de e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userData.emailPessoal)) {
            return res.status(400).json({
                success: false,
                message: 'Formato de e-mail inválido',
                details: {
                    field: 'emailPessoal',
                    message: 'O e-mail pessoal fornecido não é válido'
                }
            });
        }

        // Validação de CPF (exemplo básico)
        const cpfRegex = /^\d{11}$/;
        if (!cpfRegex.test(userData.cpf.replace(/\D/g, ''))) {
            return res.status(400).json({
                success: false,
                message: 'Formato de CPF inválido',
                details: {
                    field: 'cpf',
                    message: 'O CPF deve conter 11 dígitos numéricos'
                }
            });
        }

        // Validação completa de senha em uma única verificação
        const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
        if (!senhaRegex.test(userData.senha)) {
            return res.status(400).json({
                success: false,
                message: 'Senha inválida',
                details: {
                    field: 'senha',
                    message: 'A senha deve conter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial'
                }
            });
        }

        const newUser = await createUser(userData);
        
        return res.status(201).json({
            success: true,
            message: 'Usuário criado com sucesso',
            user: newUser
        });

    } catch (error) {
        // Tratamento de erros específicos do Prisma
        if (error.code === 'P2002') {
            return res.status(409).json({
                success: false,
                message: 'Conflito de dados únicos',
                details: {
                    field: error.meta?.target[0],
                    message: `Já existe um usuário cadastrado com este ${error.meta?.target[0]}`
                }
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Erro interno do servidor',
            details: {
                error: process.env.NODE_ENV === 'development' ? error.message : 'Erro interno'
            }
        });
    }
};

// Controlador para listar todos os usuários
export const getAllUsers = async (req, res) => {
    try {
        const users = await listAllUsers();
        
        return res.status(200).json({
            success: true,
            data: {
                count: users.length,
                users
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Erro ao listar usuários',
            details: {
                error: process.env.NODE_ENV === 'development' ? error.message : 'Erro interno'
            }
        });
    }
};