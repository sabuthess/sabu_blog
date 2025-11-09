import { DashboardSkeleton } from "./_components/DashboardSkeleton";
import prisma from "@/lib/prisma";
import { getSession } from "next-auth/react";
import { PostsCard } from "./_components/PostsCard";

async function Dashboard() {
	const { data: session } = getSession();

	
	const posts = await prisma.post.findMany({
		where: { id: session?.user?.id },
	});
	
	console.log(posts);

	return (
		<>
			<DashboardSkeleton>
				<div className='flex flex-col gap-5'>
					<h1 className='text-2xl text-gray-500'>My post images here</h1>
					<div className='flex flex-wrap gap-10 w-full mx-auto justify-center py-5 border border-gray-500'>
						{posts.length === 0 ? (
							<p>No has subido ningun post</p>
						) : (
							posts.map((post) => (
								<PostsCard
									key={post?.id}
									id={post.id}
									title={post.title}
									image_url={post.imageUrl}
									post_id={post.id}
									user_id={post.authorId}
								/>
							))
						)}
					</div>
				</div>
			</DashboardSkeleton>
		</>
	);
}
export default Dashboard;
