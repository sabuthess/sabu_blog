import Link from "next/link";

export const PostCard = ({
	id,
	username,
	title,
	description,
}: {
	id: number;
	username: string | null;
	title: string;
	description: string;
}) => {
	// const date = new Date()

	return (
		<article className='w-[350px] hover:bg-[#16a084]/20 backdrop-blur-md hover:backdrop-blur-xl rounded-2xl p-5 bg-white/10 border border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#16a084]/20'>
			<div className='flex gap-3 items-center'>
				<Link href={`/user/${username}`} className='text-[#16a084]'>
					{username}
				</Link>{" "}
				-{" "}
				{/* <span className='text-neutral-500 hover:text-gray-500'>{date}</span> */}
			</div>
			<Link href={`post/${id}`} className='post'>
				<h2 className='text-2xl text-white'>{title}</h2>
				<div className='text-gray-300'>
					<p>{description}</p>
				</div>
			</Link>
			<div className='flex justify-between items-center my-5 gap-3'>
				<Link href={`posts/${id}#comments`} className='post'>
					<div className='py-2 px-4 bg-blue-100 hover:bg-blue-300 text-black rounded-4xl'>
						<p className=''>add comment</p>
					</div>
				</Link>

				<div className="py-2 px-4 bg-amber-100 hover:bg-amber-200 text-black rounded-4xl">
					<button>add to favorites</button>
				</div>
			</div>
		</article>
	);
};
