/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
INSERT INTO "new_User" ("bairro", "cep", "cidade", "complemento", "cpf", "createdAt", "dataNascimento", "emailInstitucional", "emailPessoal", "id", "logradouro", "nome", "numero", "orgaoEmissorRG", "rg", "senha", "telefone", "tipoUsuario", "uf", "ufEmissorRG", "updatedAt") SELECT "bairro", "cep", "cidade", "complemento", "cpf", "createdAt", "dataNascimento", "emailInstitucional", "emailPessoal", "id", "logradouro", "nome", "numero", "orgaoEmissorRG", "rg", "senha", "telefone", "tipoUsuario", "uf", "ufEmissorRG", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_emailPessoal_key" ON "User"("emailPessoal");
CREATE UNIQUE INDEX "User_emailInstitucional_key" ON "User"("emailInstitucional");
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");
CREATE TABLE "new__UserInstituicoes" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_UserInstituicoes_A_fkey" FOREIGN KEY ("A") REFERENCES "Instituicao" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UserInstituicoes_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__UserInstituicoes" ("A", "B") SELECT "A", "B" FROM "_UserInstituicoes";
DROP TABLE "_UserInstituicoes";
ALTER TABLE "new__UserInstituicoes" RENAME TO "_UserInstituicoes";
CREATE UNIQUE INDEX "_UserInstituicoes_AB_unique" ON "_UserInstituicoes"("A", "B");
CREATE INDEX "_UserInstituicoes_B_index" ON "_UserInstituicoes"("B");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
