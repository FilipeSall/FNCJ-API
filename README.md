# API-FNCJ

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

**Observações:**
- O status do usuário é definido como **"NÃO_FILIADO"** por padrão no backend.
- Esta é a única forma de criar usuários (não utilizar painel Liferay).
- Hospedagem atual: **fncj-api-production.up.railway.app**

## ✅ Validações

### Campos Obrigatórios (Usuário)
- `emailPessoal`
- `senha`
- `cpf`
- `nome`

### Regras de Validação
- **Email:** Formato válido (`exemplo@dominio.com`).
- **Senha:**
  - Mínimo 8 caracteres
  - Pelo menos 1 letra maiúscula
  - Pelo menos 1 letra minúscula
  - Pelo menos 1 número
  - Pelo menos 1 caractere especial (`@$!%*?&#`)
- **CPF:** Deve conter exatamente 11 dígitos numéricos.

---

## 🎯 Status de Resposta

### Sucesso
- **200 OK** - Requisição bem-sucedida
- **201 Created** - Recurso criado com sucesso

### Erro
- **400 Bad Request** - Dados inválidos ou campos faltando
- **404 Not Found** - Recurso não encontrado
- **409 Conflict** - Conflito de dados (valores únicos duplicados)
- **500 Internal Server Error** - Erro interno do servidor

---

## 🛠 Tecnologias

- Node.js
- Express
- Prisma
- CORS

---

## 🚀 Instalação e Uso

1. Clone o repositório:
   ```bash
   git clone git@github.com:FilipeSall/FNCJ-API.git
   cd FNCJ-API
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente no arquivo `.env`.
4. Execute as migrações do banco de dados:
   ```bash
   npx prisma migrate dev
   ```
5. Inicie o servidor:
   ```bash
   npm run dev
   ```

---


