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
    "dataExpedicaoRG" DATETIME NOT NULL,
    "dataNascimento" DATETIME NOT NULL,
    "cep" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "logradouro" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT,
    "senha" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT 'https://firebasestorage.googleapis.com/v0/b/linko-52873.appspot.com/o/Ellipse%204.svg?alt=media&token=4c2a893b-a79b-4fb1-9f35-a574d4a73338',
    "tipoUsuario" TEXT NOT NULL DEFAULT 'NAO_FILIADO',
    "instituicaoId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "User_instituicaoId_fkey" FOREIGN KEY ("instituicaoId") REFERENCES "Instituicao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("bairro", "cep", "cidade", "complemento", "cpf", "createdAt", "dataExpedicaoRG", "dataNascimento", "emailInstitucional", "emailPessoal", "id", "instituicaoId", "logradouro", "nome", "numero", "orgaoEmissorRG", "rg", "senha", "telefone", "tipoUsuario", "uf", "updatedAt") SELECT "bairro", "cep", "cidade", "complemento", "cpf", "createdAt", "dataExpedicaoRG", "dataNascimento", "emailInstitucional", "emailPessoal", "id", "instituicaoId", "logradouro", "nome", "numero", "orgaoEmissorRG", "rg", "senha", "telefone", "tipoUsuario", "uf", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_emailPessoal_key" ON "User"("emailPessoal");
CREATE UNIQUE INDEX "User_emailInstitucional_key" ON "User"("emailInstitucional");
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
