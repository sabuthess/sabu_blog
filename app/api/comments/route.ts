/* 
- Crear, borrar, actualizar 
*/

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const { post_id } = await request.json();
	try {
		const comments = await prisma.comment.findMany({
			where: {
				post_id: post_id,
			},
		});

		return NextResponse.json({ message:"comments cargados" ,comments });
	} catch (error) {
		console.log({ message: "internal server error", error });
		return NextResponse.json({
			message: "Server internal error",
			status: 500,
		});
	}
}

export async function POST(request: NextRequest) {
	const { message, user_id, post_id } = await request.json();

	try {
		const comment = prisma.comment.create({
			data: {
				message,
				user_id,
				post_id,
			},
		});
		revalidatePath(`/post`);
		return NextResponse.json({
			message: "comment created",
			status: 201,
			comment,
		});
	} catch (error) {
		console.log({ message: "internal server error", error });
		return NextResponse.json({
			message: "Server internal error",
			status: 500,
		});
	}
}
