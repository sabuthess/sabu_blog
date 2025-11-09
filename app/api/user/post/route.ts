import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
	try {
		const { user_id, post_id } = await request.json();

		if (!user_id || !post_id) {
			return NextResponse.json({ error: "Parameters are missing" }, { status: 400 });
		}

		// Si el id en tu modelo es Int:
		const postId = Number(post_id);
		if (isNaN(postId)) {
			return NextResponse.json({ error: "ID unvalid" }, { status: 400 });
		}

		const post = await prisma.post.findUnique({
			where: { id: postId },
		});

		if (!post) {
			return NextResponse.json(
				{ error: "Post not found" },
				{ status: 404 }
			);
		}

		if (post.authorId !== user_id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
		}

		await prisma.post.delete({ where: { id: postId } });
		revalidatePath("/dashboard");

		return NextResponse.json({ success: true, message: "Post deleted" });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Server Internal Error" },
			{ status: 500 }
		);
	}
}
