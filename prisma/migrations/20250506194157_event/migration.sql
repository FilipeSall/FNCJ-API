-- CreateTable
CREATE TABLE "Evento" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "sigla" TEXT,
    "dataInicio" DATETIME,
    "dataFim" DATETIME,
    "cidade" TEXT,
    "uf" TEXT,
    "premioId" TEXT,
    "completo" BOOLEAN NOT NULL DEFAULT false,
    "vencimentoLote1" DATETIME,
    "vencimentoLote2" DATETIME,
    "vencimentoLote3" DATETIME,
    "precoLote1Filiado" REAL,
    "precoLote1NaoFiliado" REAL,
    "precoLote1Estudante" REAL,
    "precoLote2Filiado" REAL,
    "precoLote2NaoFiliado" REAL,
    "precoLote2Estudante" REAL,
    "precoLote3Filiado" REAL,
    "precoLote3NaoFiliado" REAL,
    "precoLote3Estudante" REAL,
    "precoEmpenhoFiliado" REAL,
    "precoEmpenhoNaoFiliado" REAL,
    "precoEmpenhoEstudante" REAL,
    "limiteFiliacao" DATETIME,
    "linkPesquisaOpiniao" TEXT,
    "linkResultadosPesquisa" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Evento_premioId_fkey" FOREIGN KEY ("premioId") REFERENCES "Premio" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EventoFormaPagamento" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventoId" TEXT NOT NULL,
    "formaPagamento" TEXT NOT NULL,
    CONSTRAINT "EventoFormaPagamento_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Premio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "edicao" TEXT NOT NULL,
    "completo" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Certificado" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "eventoId" TEXT NOT NULL,
    "templateUrl" TEXT,
    CONSTRAINT "Certificado_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "InscricaoEvento" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "eventoId" TEXT NOT NULL,
    "dataInscricao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statusPagamento" TEXT NOT NULL DEFAULT 'PENDENTE',
    "formaPagamento" TEXT,
    "valorPago" REAL,
    "lote" INTEGER,
    CONSTRAINT "InscricaoEvento_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "InscricaoEvento_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "EventoFormaPagamento_eventoId_formaPagamento_key" ON "EventoFormaPagamento"("eventoId", "formaPagamento");

-- CreateIndex
CREATE UNIQUE INDEX "InscricaoEvento_userId_eventoId_key" ON "InscricaoEvento"("userId", "eventoId");
