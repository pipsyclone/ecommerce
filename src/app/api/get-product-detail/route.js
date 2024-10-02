import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
	try {
		const productid = request.nextUrl.searchParams.get("productid");
		const data = await prisma.products.findUnique({
			where: { productid: parseInt(productid) },
		});

		if (data === null) {
			return NextResponse.json({
				status: 404,
				message: "Data produk tidak ditemukan!",
			});
		}

		return NextResponse.json({ status: 200, message: "OK!", data: data });
	} catch (err) {
		return NextResponse.json({ status: 500, message: err.message });
	}
}
