-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "emailPessoal" TEXT NOT NULL,
    "emailInstitucional" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "orgaoEmissorRG" TEXT NOT NULL,
    "ufEmissorRG" TEXT NOT NULL,
    "dataNascimento" DATETIME NOT NULL,
    "cep" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "logradouro" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT,
    "senha" TEXT NOT NULL,
    "tipoUsuario" TEXT NOT NULL DEFAULT 'NAO_FILIADO',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Instituicao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UserInstituicoes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_UserInstituicoes_A_fkey" FOREIGN KEY ("A") REFERENCES "Instituicao" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UserInstituicoes_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_emailPessoal_key" ON "User"("emailPessoal");

-- CreateIndex
CREATE UNIQUE INDEX "User_emailInstitucional_key" ON "User"("emailInstitucional");

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Instituicao_nome_key" ON "Instituicao"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "_UserInstituicoes_AB_unique" ON "_UserInstituicoes"("A", "B");

-- CreateIndex
CREATE INDEX "_UserInstituicoes_B_index" ON "_UserInstituicoes"("B");
