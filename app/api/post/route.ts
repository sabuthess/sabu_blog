import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const { title, content, image, authorId } = await request.json();
	try {
		const post = await prisma.post.create({
			data: {
				title,
				content,
				imageUrl: image,
				authorId,
			},
		});
		revalidatePath("/");
		return NextResponse.json({ message: "post created", status: 201, post });
	} catch (error) {
		console.log({message:"internal server error", error});
		return NextResponse.json({
			message: "Server internal error",
			status: 500,
		});
	}
}
