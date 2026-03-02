import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const PRODUCTS = [
    {
        name: 'Premium Brown Coir Fibre',
        categoryId: 'primary',
        subcategoryId: 'brown-coir-fibre',
        price_per_kg: 18,
        unit: 'kg',
        quantity_available: 5000,
        description: 'High-quality brown coir fibre sourced from mature coconuts. Ideal for rope making, mattress manufacturing, and geo-textile applications. Processed and graded at our Alappuzha facility.',
        image: '/cat1.png',
        seller: { name: 'Alappuzha Coir Works', location: 'Alappuzha', contact: '+91 94471 23456' },
        inStock: true,
        trending: true,
    },
    {
        name: 'White Coir Fibre (Retted)',
        categoryId: 'primary',
        subcategoryId: 'white-coir-fibre',
        price_per_kg: 24,
        unit: 'kg',
        quantity_available: 2000,
        description: 'Traditional water-retted white coir fibre, preferred for fine yarn and high-end mat production. Naturally bleached and sun-dried.',
        image: '/cat1.png',
        seller: { name: 'Kerala Coir Exports', location: 'Kayamkulam', contact: '+91 94770 56789' },
        inStock: true,
        trending: false,
    },
    {
        name: 'Coco Peat (Loose)',
        categoryId: 'primary',
        subcategoryId: 'coir-pith',
        price_per_kg: 6,
        unit: 'kg',
        quantity_available: 20000,
        description: 'Fine-grade coco peat with low EC and pH 5.8–6.5. Excellent water retention. Ideal for hydroponics, potting mix, and soil conditioning.',
        image: '/cat1.png',
        seller: { name: 'Green Roots Agro', location: 'Ernakulam', contact: '+91 97444 11223' },
        inStock: true,
        trending: true,
    },
    {
        name: 'Coco Peat Blocks 5kg',
        categoryId: 'intermediate',
        subcategoryId: 'coco-peat-blocks',
        price_per_kg: 45,
        unit: 'block',
        quantity_available: 3000,
        description: 'Compressed 5kg coco peat bricks that expand to 70–75L growing medium. Exported quality, low EC, suitable for export markets.',
        image: '/cat2.png',
        seller: { name: 'CoirTech Industries', location: 'Thrissur', contact: '+91 98470 33344' },
        inStock: true,
        trending: true,
    },
    {
        name: 'Twisted Coir Rope 6mm',
        categoryId: 'intermediate',
        subcategoryId: 'coir-rope',
        price_per_kg: 52,
        unit: 'kg',
        quantity_available: 800,
        description: '3-ply twisted coir rope, 6mm diameter. High tensile strength. Used for decorative garden fencing, handicrafts, and traditional construction.',
        image: '/cat2.png',
        seller: { name: 'Rope Craft Kerala', location: 'Kollam', contact: '+91 94000 78901' },
        inStock: true,
        trending: false,
    },
    {
        name: 'Handloom Coir Door Mat',
        categoryId: 'final',
        subcategoryId: 'mats-matting',
        price_per_kg: 280,
        unit: 'piece',
        quantity_available: 500,
        description: 'Traditional Kerala handloom coir doormat, 40×60cm. Natural brown finish with anti-slip backing. Exported to Europe and Middle East markets.',
        image: '/cat3.png',
        seller: { name: 'Artisan Mat Co.', location: 'Alappuzha', contact: '+91 98950 44556' },
        inStock: true,
        trending: true,
    },
    {
        name: 'Coir Geo-Textile Roll',
        categoryId: 'final',
        subcategoryId: 'geo-textiles',
        price_per_kg: 1200,
        unit: 'roll',
        quantity_available: 120,
        description: 'Biodegradable coir geo-textile for slope stabilization and erosion control. 2m × 25m per roll. Approved for government infrastructure projects.',
        image: '/cat3.png',
        seller: { name: 'EcoGeo Coir', location: 'Thiruvananthapuram', contact: '+91 94478 99001' },
        inStock: true,
        trending: false,
    },
    {
        name: 'Coir Mattress (Single)',
        categoryId: 'final',
        subcategoryId: 'mattresses',
        price_per_kg: 3500,
        unit: 'piece',
        quantity_available: 200,
        description: 'Firm coir mattress with breathable natural filling. Single bed size 72×36×4 inches. Rubberized coir for superior support and durability.',
        image: '/cat3.png',
        seller: { name: 'NatureSleep Kerala', location: 'Kottayam', contact: '+91 97470 22334' },
        inStock: false,
        trending: false,
    },
    {
        name: 'Coconut Shell Charcoal',
        categoryId: 'final',
        subcategoryId: 'shell-charcoal',
        price_per_kg: 35,
        unit: 'kg',
        quantity_available: 10000,
        description: 'Premium coconut shell charcoal with 80%+ fixed carbon content. Used for activated carbon production, BBQ, and water filtration.',
        image: '/cat3.png',
        seller: { name: 'ShellPower Exports', location: 'Thrissur', contact: '+91 94461 55667' },
        inStock: true,
        trending: false,
    },
    {
        name: 'Coir Yarn (2-ply)',
        categoryId: 'intermediate',
        subcategoryId: 'coir-yarn',
        price_per_kg: 68,
        unit: 'kg',
        quantity_available: 1500,
        description: '2-ply twisted coir yarn. Consistent thickness, smooth finish. Preferred by mat weavers and home décor manufacturers across Kerala.',
        image: '/cat2.png',
        seller: { name: 'YarnMasters Alappuzha', location: 'Alappuzha', contact: '+91 98950 77889' },
        inStock: true,
        trending: true,
    },
    {
        name: 'Horticulture Coir Pot 5"',
        categoryId: 'final',
        subcategoryId: 'horticulture',
        price_per_kg: 12,
        unit: 'piece',
        quantity_available: 5000,
        description: 'Biodegradable coir planting pot, 5-inch diameter. Perfect for nurseries and home gardeners. Transplant directly into soil — no root shock.',
        image: '/cat3.png',
        seller: { name: 'GreenGrow Coir', location: 'Palakkad', contact: '+91 94476 33112' },
        inStock: true,
        trending: true,
    },
    {
        name: 'Coconut Husk (Fresh)',
        categoryId: 'primary',
        subcategoryId: 'coconut-husk',
        price_per_kg: 3,
        unit: 'kg',
        quantity_available: 50000,
        description: 'Fresh coconut husks sourced directly from Alappuzha coconut farms. Ready for retting or mechanical extraction. Minimum order 500kg.',
        image: '/cat1.png',
        seller: { name: 'Alappuzha Farmers Co-op', location: 'Alappuzha', contact: '+91 98474 10101' },
        inStock: true,
        trending: false,
    },
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
                categoryId: product.categoryId,
                subcategoryId: product.subcategoryId,
                description: product.description,
                image: product.image,
                unit: product.unit,
                inStock: product.inStock,
                trending: product.trending,
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
