import { NextResponse } from "next/server";

export async function GET() {
	try {
		const data = await prisma.carts.findMany();
		return NextResponse.json({ status: 200, message: "OK!", data: data });
	} catch (err) {
		return NextResponse.json({ status: 500, message: err.message });
	}
}
