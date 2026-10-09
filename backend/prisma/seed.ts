import {
    PrismaClient,
    ProductType,
    WorkCenterStatus,
    UserRole,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const admin = await prisma.user.upsert({
        where: { email: "admin@demo.com" },
        update: {},
        create: {
            name: "Admin User",
            email: "admin@demo.com",
            passwordHash: "temporary-hash",
            role: UserRole.ADMIN,
        },
    });

    const steelBolt = await prisma.product.upsert({
        where: { sku: "RAW-001" },
        update: {},
        create: {
            name: "Steel Bolt",
            sku: "RAW-001",
            type: ProductType.RAW,
            uom: "pcs",
            unitCost: 10,
            reorderLevel: 20,
        },
    });

    const finishedWidget = await prisma.product.upsert({
        where: { sku: "FG-001" },
        update: {},
        create: {
            name: "Finished Widget",
            sku: "FG-001",
            type: ProductType.FINISHED,
            uom: "pcs",
            unitCost: 1000,
            reorderLevel: 10,
        },
    });

    const workCenter = await prisma.workCenter.upsert({
        where: { code: "WC-001" },
        update: {},
        create: {
            name: "Assembly Line 1",
            code: "WC-001",
            description: "Main assembly work center",
            costPerHour: 500,
            capacityPerDay: 100,
            status: WorkCenterStatus.ACTIVE,
        },
    });

    const bom = await prisma.bom.upsert({
        where: {
            finishedGoodId_version: {
                finishedGoodId: finishedWidget.id,
                version: 1,
            },
        },
        update: {},
        create: {
            finishedGoodId: finishedWidget.id,
            version: 1,
            referenceQty: 1,
            isActive: true,
            notes: "Initial BOM",
            createdBy: admin.id,
            components: {
                create: {
                    productId: steelBolt.id,
                    quantity: 1,
                    unit: "pcs",
                },
            },
            operations: {
                create: {
                    name: "Assembly",
                    workCenterId: workCenter.id,
                    durationMins: 10,
                    sequence: 1,
                },
            },
        },
    });

    console.log("Seed completed successfully.");
    console.log({
        admin: admin.email,
        rawProduct: steelBolt.sku,
        finishedProduct: finishedWidget.sku,
        workCenter: workCenter.code,
        bom: bom.id,
    });
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });