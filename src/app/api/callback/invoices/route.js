import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export const config = {
	api: {
		bodyParser: false, // Disable bodyParser untuk menangani raw body
	},
};

export async function POST(request) {
	try {
		// Baca raw body dari request menggunakan arrayBuffer
		const rawBodyBuffer = await request.arrayBuffer();
		// Konversi arrayBuffer ke Buffer
		const rawBody = Buffer.from(rawBodyBuffer);

		// Parse data dari body request setelah signature diverifikasi
		const event = JSON.parse(rawBody.toString());

		if (event.status === "PAID") {
			await prisma.transactions.update({
				where: { trid: event.external_id },
				data: {
					status: "Menunggu Konfirmasi",
				},
			});
		} else if (event.status === "EXPIRED") {
			await prisma.transactions.update({
				where: { trid: event.external_id },
				data: {
					status: "Invoice Kadaluarsa!",
				},
			});
		} else {
			await prisma.transactions.update({
				where: { trid: event.external_id },
				data: {
					status: event.status,
				},
			});
		}

		// Proses data event di sini (contoh: simpan ke database, update status transaksi, dll.)
		return NextResponse.json(event);
	} catch (err) {
		return NextResponse.json({ status: 500, message: err.message });
	}
}
