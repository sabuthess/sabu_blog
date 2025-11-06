import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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
		return NextResponse.json({ messague: "post created", status: 201, post });
	} catch (error) {
		console.log(error);
		return NextResponse.json({
			messague: "Server internal error",
			status: 500,
		});
	}
	finally{
		revalidatePath("/");
		redirect("/")
	}
}
