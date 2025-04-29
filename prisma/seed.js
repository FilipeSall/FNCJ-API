import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const instituicoes = [
        { nome: 'STF - Superior Tribunal Federal' },
        { nome: 'STJ - Superior Tribunal de Justiça' },  
        { nome: 'TSE - Tribunal Superior Eleitoral' }, 
        { nome: 'SEAtecnologia'}
    ];

    for (const inst of instituicoes) {
        await prisma.instituicao.upsert({
            where: { nome: inst.nome },
            update: {},
            create: inst,
        });
        console.log(`✔️ Instituição ${inst.nome} inserida/upserted.`);
    }
}

main()
    .catch(e => {
        console.error('💥 Burro! Deu ruim no seed:', e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
