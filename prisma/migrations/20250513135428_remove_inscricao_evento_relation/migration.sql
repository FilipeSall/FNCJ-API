-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_InscricaoEvento" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "eventoId" TEXT NOT NULL,
    "dataInscricao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statusPagamento" TEXT NOT NULL DEFAULT 'PENDENTE',
    "formaPagamento" TEXT,
    "valorPago" REAL,
    "lote" INTEGER,
    CONSTRAINT "InscricaoEvento_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_InscricaoEvento" ("dataInscricao", "eventoId", "formaPagamento", "id", "lote", "statusPagamento", "userId", "valorPago") SELECT "dataInscricao", "eventoId", "formaPagamento", "id", "lote", "statusPagamento", "userId", "valorPago" FROM "InscricaoEvento";
DROP TABLE "InscricaoEvento";
ALTER TABLE "new_InscricaoEvento" RENAME TO "InscricaoEvento";
CREATE UNIQUE INDEX "InscricaoEvento_userId_eventoId_key" ON "InscricaoEvento"("userId", "eventoId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
