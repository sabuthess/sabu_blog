import prisma from "@/lib/prisma";
import { Header } from "./components/Header";
import { PostCard } from "./components/PostCard";

async function Home() {
	const posts = await prisma.post.findMany({
		include: {
			author: true,
		},
	});
	return (
		<>
			<Header />
			<main className='w-3/5 mx-auto mt-30 flex flex-wrap justify-center gap-4 relative z-10'>
				{posts.map((post) => (
					<PostCard
						key={post.id}
						id={post.id}
						username={post.author.name}
						title={post.title}
						description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi in rem maxime minus omnis soluta, et facilis deserunt veritatis itaque accusamus, ea quos, dolore cum a unde quidem placeat aut?'
					/>
				))}
			</main>
		</>
	);
}

export default Home;
