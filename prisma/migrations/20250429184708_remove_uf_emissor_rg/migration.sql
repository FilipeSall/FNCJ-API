/*
  Warnings:

  - You are about to drop the column `ufEmissorRG` on the `User` table. All the data in the column will be lost.

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
INSERT INTO "new_User" ("bairro", "cep", "cidade", "complemento", "cpf", "createdAt", "dataNascimento", "emailInstitucional", "emailPessoal", "id", "logradouro", "nome", "numero", "orgaoEmissorRG", "rg", "senha", "telefone", "tipoUsuario", "uf", "updatedAt") SELECT "bairro", "cep", "cidade", "complemento", "cpf", "createdAt", "dataNascimento", "emailInstitucional", "emailPessoal", "id", "logradouro", "nome", "numero", "orgaoEmissorRG", "rg", "senha", "telefone", "tipoUsuario", "uf", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_emailPessoal_key" ON "User"("emailPessoal");
CREATE UNIQUE INDEX "User_emailInstitucional_key" ON "User"("emailInstitucional");
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
