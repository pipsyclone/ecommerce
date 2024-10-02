import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
	try {
		const body = await request.json();
		const { productid, quantity } = body;

		const existingItem = await prisma.carts.findFirst({
			where: {
				// userid: userid, // if you had account
				productid: parseInt(productid),
			},
		});

		if (existingItem) {
			await prisma.carts.update({
				where: { cartid: existingItem.cartid },
				data: {
					quantity: existingItem.quantity + quantity,
				},
			});

			return NextResponse.json({ status: 200, message: "OK!" });
		} else {
			await prisma.carts.create({
				data: {
					productid: parseInt(productid),
					quantity: quantity,
				},
			});

			return NextResponse.json({ status: 200, message: "OK!" });
		}
	} catch (err) {
		return NextResponse.json({ status: 500, message: err.message });
	}
}
