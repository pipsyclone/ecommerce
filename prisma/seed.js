const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
	await prisma.products.create({
		data: {
			name: "Dummy 1",
			price: 15000,
			image: "dummy",
			stock: 5,
		},
	});
	await prisma.products.create({
		data: {
			name: "Dummy 2",
			price: 125000,
			image: "dummy",
			stock: 5,
		},
	});
	await prisma.products.create({
		data: {
			name: "Dummy 3",
			price: 15000,
			image: "dummy",
			stock: 5,
		},
	});
	await prisma.products.create({
		data: {
			name: "Dummy 4",
			price: 150000,
			image: "dummy",
			stock: 5,
		},
	});
	await prisma.products.create({
		data: {
			name: "Dummy 5",
			price: 90000,
			image: "dummy",
			stock: 5,
		},
	});
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
