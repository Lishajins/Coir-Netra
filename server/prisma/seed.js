import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Clearing old data...');
    await prisma.products.deleteMany();
    await prisma.users.deleteMany();

    console.log('Seeding test data...');
    const seller = await prisma.users.create({
        data: {
            location: 'Alappuzha, Kerala',
        },
    });

    await prisma.products.create({
        data: {
            seller_id: seller.id,
            name: 'Premium Coconut Coir Pith',
            price_per_kg: 45.50,
            quantity_available: 500,
        },
    });

    await prisma.products.create({
        data: {
            seller_id: seller.id,
            name: 'Coir Geo Textiles - 400 GSM',
            price_per_kg: 120.00,
            quantity_available: 1000,
        },
    });

    console.log('Database seeded successfully! 🎉');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
