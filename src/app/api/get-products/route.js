import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
	try {
		const data = await prisma.products.findMany();
		return NextResponse.json({ status: 200, message: "OK!", data: data });
	} catch (err) {
		return NextResponse.json({ status: 500, message: err.message });
	}
}
