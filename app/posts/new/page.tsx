// app/create-post/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import CreatePostClient from "@/app/components/CreatePost";

export default async function CreatePostPage() {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect("/login");
	}

	return <CreatePostClient />;
}
