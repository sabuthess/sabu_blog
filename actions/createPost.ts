"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";



export const createPost = async (formData: FormData) => {
	const title = formData.get("title") as string;
	const content = formData.get("content") as string;
	const session = await getServerSession(authOptions)

	await prisma.post.create({
		data: {
			title,
			content,
			authorId: session.user.id,
		},
	});

	revalidatePath("/");
	redirect("/");
	
};
