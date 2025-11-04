"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const Header = () => {
	const { data: session } = useSession();

	return (
		<header className='w-3/5 m-10 mx-auto flex justify-between items-center relative '>
			<Link href='/' className='text-4xl text-white font-bold '>
				Sabu Blog
			</Link>
			<nav className='flex gap-4 items-center'>
				{session ? (
					<button onClick={() => signOut()}>Logout</button>
				) : (
					<Link href='/login'>Login</Link>
				)}

				<Link
					href='/posts/new'
					className='text-white border border-teal-400 p-2'>
					Create a post
				</Link>
			</nav>
		</header>
	);
};
