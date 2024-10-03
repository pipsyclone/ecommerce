import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function PUT(request) {
	try {
		const body = await request.json();
		const { cartid, quantity } = body;

		const data = await prisma.carts.update({
			where: { cartid: cartid },
			data: {
				quantity: quantity,
			},
		});

		return NextResponse.json({ status: 200, message: "OK!", data: data });
	} catch (err) {
		return NextResponse.json({ status: 500, message: err.message });
	}
}
