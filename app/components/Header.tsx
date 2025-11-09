"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const Header = () => {
	const { data: session } = useSession();
	const [clickUserAvatar, setClickUserAvatar] = useState(false);

	// TODO: this url is undefine, search the problen
	/* console.log(session?.user?.image) */

	return (
		<header className='w-3/5 m-10 mx-auto flex justify-between items-center relative '>
			<Link href='/' className='text-4xl text-white font-bold '>
				Sabu Blog
			</Link>
			<nav className='flex gap-4 items-center'>
				{session ? (
					<div>
						<div
							onClick={() => setClickUserAvatar(!clickUserAvatar)}
							className='bg-neutral-900 flex justify-center items-center rounded-full cursor-pointer'>
							<Image
								src={`https://robohash.org/${session?.user?.name}`}
								alt='User Avatar'
								width={50}
								height={50}
								className='rounded-full'
							/>
						</div>
						{clickUserAvatar ? (
							<div className='absolute z-50 flex flex-col gap-2 top-15 right-3 w-52 bg-[#16a084]/20 backdrop-blur-md border border-white/20   p-5 text-start rounded-lg text-white'>
								<p className='font-bold text-white truncate'>{session?.user?.name}</p>
								<hr />
								<div className='hover:bg-neutral-100/20 w-full p-2 rounded-lg '>
									<Link href={`/users?user=${session?.user?.id}`}>Mi Perfil</Link>
								</div>
								<div className='hover:bg-neutral-100/20 w-full p-2 rounded-lg '>
									<Link href={`/dashboard`}>Dashboard</Link>
								</div>
								<div
									onClick={() => signOut()}
									className='hover:bg-neutral-100/20 w-full p-2 rounded-lg cursor-pointer'>
									<p>Logout</p>
								</div>
							</div>
						) : (
							""
						)}
					</div>
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
