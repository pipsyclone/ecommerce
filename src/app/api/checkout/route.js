import { NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/libs/prisma";

export async function POST(request) {
	const body = await request.json();
	const authToken = Buffer.from(
		process.env.NEXT_PUBLIC_XENDIT_SECRET_KEY
	).toString("base64");
	const { cartItems, totalAmount } = body;
	const formatItems = cartItems.map((item) => ({
		name: item.products.name,
		quantity: item.quantity,
		price: item.products.price,
	}));

	try {
		if (!cartItems || !totalAmount) {
			return res.status(400).json({ message: "Missing required fields" });
		}

		const { data, status } = await axios.post(
			"https://api.xendit.co/v2/invoices",
			{
				external_id: `invoice-${Date.now()}`,
				items: formatItems,
				amount: totalAmount,
				success_redirect_url: "http://localhost:3000/orders",
				failure_redirect_url: "http://localhost:3000/orders",
			},
			{
				headers: {
					Authorization: `Basic ${authToken}`,
				},
			}
		);

		const { external_id, invoice_url, id, expiry_date } = data;

		if (status === 200) {
			await prisma.transactions.create({
				data: {
					trid: external_id,
					totalprice: totalAmount,
					invoiceid: id,
					paymentlink: invoice_url,
					expirydate: expiry_date,
				},
			});

			await prisma.detailTransactions.createMany({
				data: cartItems.map((item) => ({
					trid: external_id,
					productid: item.products.productid,
					quantity: item.quantity,
				})),
			});

			await prisma.carts.deleteMany();

			return NextResponse.json({
				status: 200,
				message: "Berhasil Membuat Pesanan!",
				redirectUrl: "http://localhost:3000/orders",
				data: data,
			});
		}

		return NextResponse.json({
			status: status,
			message: data.status,
		});
	} catch (err) {
		return NextResponse.json({ status: 500, message: err.message });
	}
}
