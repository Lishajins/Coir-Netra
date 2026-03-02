import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const PRODUCTS = [
    {
        name: 'Premium Brown Coir Fibre',
        price_per_kg: 18,
        quantity_available: 5000,
        seller: { name: 'Alappuzha Coir Works', location: 'Alappuzha' },
    },
    {
        name: 'White Coir Fibre (Retted)',
        price_per_kg: 24,
        quantity_available: 2000,
        seller: { name: 'Kerala Coir Exports', location: 'Kayamkulam' },
    },
    {
        name: 'Coco Peat (Loose)',
        price_per_kg: 6,
        quantity_available: 20000,
        seller: { name: 'Green Roots Agro', location: 'Ernakulam' },
    },
    {
        name: 'Coco Peat Blocks 5kg',
        price_per_kg: 45,
        quantity_available: 3000,
        seller: { name: 'CoirTech Industries', location: 'Thrissur' },
    },
    {
        name: 'Twisted Coir Rope 6mm',
        price_per_kg: 52,
        quantity_available: 800,
        seller: { name: 'Rope Craft Kerala', location: 'Kollam' },
    },
    {
        name: 'Handloom Coir Door Mat',
        price_per_kg: 280,
        quantity_available: 500,
        seller: { name: 'Artisan Mat Co.', location: 'Alappuzha' },
    },
    {
        name: 'Coir Geo-Textile Roll',
        price_per_kg: 1200,
        quantity_available: 120,
        seller: { name: 'EcoGeo Coir', location: 'Thiruvananthapuram' },
    },
    {
        name: 'Coconut Shell Charcoal',
        price_per_kg: 35,
        quantity_available: 10000,
        seller: { name: 'ShellPower Exports', location: 'Thrissur' },
    },
    {
        name: 'Coir Yarn (2-ply)',
        price_per_kg: 68,
        quantity_available: 1500,
        seller: { name: 'YarnMasters Alappuzha', location: 'Alappuzha' },
    },
    {
        name: 'Horticulture Coir Pot 5"',
        price_per_kg: 12,
        quantity_available: 5000,
        seller: { name: 'GreenGrow Coir', location: 'Palakkad' },
    },
    {
        name: 'Coconut Husk (Fresh)',
        price_per_kg: 3,
        quantity_available: 50000,
        seller: { name: 'Alappuzha Farmers Co-op', location: 'Alappuzha' },
    }
];

async function main() {
    console.log('Seeding Local Postgres Database based on Frontend Mock Data...');

    // Clear existing items
    await prisma.products.deleteMany();
    await prisma.users.deleteMany();

    for (const product of PRODUCTS) {
        // Generate a user/seller
        const seller = await prisma.users.create({
            data: {
                location: product.seller.location,
            }
        });

        // Create the product linked to the seller
        await prisma.products.create({
            data: {
                name: product.name,
                price_per_kg: product.price_per_kg,
                quantity_available: product.quantity_available,
                seller_id: seller.id
            }
        });
    }

    console.log('Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
