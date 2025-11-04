import { Header } from "@/app/components/Header";
import prisma from "@/lib/prisma";
import { Link } from "lucide-react";
import { notFound } from "next/navigation";

async function Post({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const post = await prisma.post.findUnique({
		where: { id: parseInt(id) },
		include: {
			author: true,
		},
	});

	if (!post) return notFound();

	return (
		<>
			<Header />
			<div className='min-h-screen  flex flex-col items-center justify-center '>
				<article className='max-w-2xl space-y-4'>
					<h1 className='text-4xl font-bold mb-8 text-[#333333]'>
						{post.title}
					</h1>
					<Link href={`/user/${post.authorId}`}>
					<p className='text-gray-600 text-center'>by {post.author.name}</p>
					</Link>
					<div className='prose prose-gray mt-8'>
						{post.content || "No content available."}
					</div>
				</article>
			</div>
		</>
	);
}

export default Post;
