"use server";

import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(data: {
	title: string;
	content: string;
	imageUrl?: string;
}) {
	const session = await getServerSession(authOptions);
	if (!session) throw new Error("No autorizado");

	const { title, content, imageUrl } = data;
	try {
		const post = await prisma.post.create({
			data: {
				title,
				content,
				imageUrl: imageUrl || null,
				authorId: session?.user?.id,
			},
		});

		console.log("Post creado:", post);
	} catch (error) {
		console.error("Error creating post:", error);
		throw new Error("Error al crear el post");
	}

	revalidatePath("/");
	redirect("/");
}
