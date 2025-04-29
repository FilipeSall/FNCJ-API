# API de Gerenciamento de Usuários e Instituições 

## 🔍 Quick Reference - Rotas

### 👤 Usuários
- `POST /api/v1/users` - Criar usuário
- `GET /api/v1/users` - Listar todos
- `GET /api/v1/users/email/:email` - Buscar por email pessoal
- `GET /api/v1/users/email-institucional/:email` - Buscar por email institucional  
- `GET /api/v1/users/cpf/:cpf` - Buscar por CPF
- `PUT /api/v1/users/:id` - Atualizar usuário
- `DELETE /api/v1/users/:id` - Remover usuário

### 🏢 Instituições
- `POST /api/v1/instituicoes` - Criar instituição
- `GET /api/v1/instituicoes` - Listar todas
- `GET /api/v1/instituicoes/:id` - Buscar por ID
- `PUT /api/v1/instituicoes/:id` - Atualizar instituição
- `DELETE /api/v1/instituicoes/:id` - Remover instituição


