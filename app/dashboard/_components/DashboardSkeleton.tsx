"use client";

import {
	Dialog,
	DialogBackdrop,
	Menu,
	MenuButton,
	MenuItems,
	Transition,
} from "@headlessui/react";
import {
	XMarkIcon,
	MagnifyingGlassIcon,
	HomeIcon,
	Bars3Icon as MenuIcon,
	HeartIcon,
	BookmarkIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import { Fragment, useState } from "react";
import { redirect, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";


function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export const DashboardSkeleton = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const { data: session } = useSession();
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [inputValueSearch, setInputValueSearch] = useState("");
	const router = useRouter();
	const pathname = usePathname();

	const handleChangeInputForm = ({ target }) =>
		setInputValueSearch(target.value);

	const handleSubmit = (e) => {
		e.preventDefault();
		router.push(`/posts?search=${encodeURIComponent(inputValueSearch)}`);
	};

	const isActive = (href: string) => {
		if (href === "/dashboard") {
			return pathname === "/dashboard";
		}
		return pathname.startsWith(href);
	};

	const navigation = [
		{ name: "My posts", href: "/dashboard", icon: HomeIcon, current: true },
		{
			name: "Posts favorites",
			href: "/dashboard/favorites",
			icon: BookmarkIcon,
			current: false,
		},
		{
			name: "Posts comments",
			href: "/dashboard/comments",
			icon: HeartIcon,
			current: false,
		},
	];
	const userNavigation = [
		{ name: "Home", href: "/" },
		{ name: "Profile", href: `/users?user=${session?.user?.id}` },
		{ name: "Create Post", href: "/posts/new" },
		// { name: 'Cerrar Sesión',  }, TODO: create the route of logout
	];


	if (!session) redirect("/")

	return (
		<>
			{/* <HeaderDashboard/> */}
			<div>
				<Transition.Root show={sidebarOpen} as={Fragment}>
					<Dialog
						as='div'
						className='fixed inset-0 flex z-40 md:hidden'
						onClose={setSidebarOpen}>
						<Transition.Child
							as={Fragment}
							enter='transition-opacity ease-linear duration-300'
							enterFrom='opacity-0'
							enterTo='opacity-100'
							leave='transition-opacity ease-linear duration-300'
							leaveFrom='opacity-100'
							leaveTo='opacity-0'>
							<DialogBackdrop
								className='fixed inset-0  bg-black/10 backdrop-blur-2xl'
								aria-hidden='true'
							/>
						</Transition.Child>
						<Transition.Child
							as={Fragment}
							enter='transition ease-in-out duration-300 transform'
							enterFrom='-translate-x-full'
							enterTo='translate-x-0'
							leave='transition ease-in-out duration-300 transform'
							leaveFrom='translate-x-0'
							leaveTo='-translate-x-full'>
							<div className='relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-[#16a084]/20 backdrop-blur-md     '>
								<Transition.Child
									as={Fragment}
									enter='ease-in-out duration-300'
									enterFrom='opacity-0'
									enterTo='opacity-100'
									leave='ease-in-out duration-300'
									leaveFrom='opacity-100'
									leaveTo='opacity-0'>
									<div className='absolute top-0 right-0 -mr-12 pt-2'>
										<button
											type='button'
											className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white cursor-pointer '
											onClick={() => setSidebarOpen(false)}>
											<span className='sr-only'>Close sidebar</span>
											<XMarkIcon
												className='h-6 w-6 text-white'
												aria-hidden='true'
											/>
										</button>
									</div>
								</Transition.Child>
								<div className='flex-shrink-0 flex items-center px-4 '>
									<Image
										className='h-8 w-auto'
										src='https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg'
										alt='Workflow'
										width={50}
										height={50}
									/>
								</div>
								<div className='mt-10 flex-1  h-0 overflow-y-auto '>
									<nav className='px-2 space-y-1 flex flex-col gap-4 '>
										{navigation.map((item) => {
											const current = isActive(item.href);

											return (
												<Link
													key={item.name}
													href={item.href}
													className={classNames(
														current
															? "bg-white text-black "
															: "text-white hover:bg-white/10 ",
														"group flex items-center px-2 py-2 text-base font-medium "
													)}>
													<item.icon
														className={classNames(
															current ? "" : " ",
															"mr-4 flex-shrink-0 h-6 w-6"
														)}
														aria-hidden='true'
													/>
													{item.name}
												</Link>
											);
										})}
									</nav>
								</div>
							</div>
						</Transition.Child>
						<div className='flex-shrink-0 w-14' aria-hidden='true'>
							{/* Dummy element to force sidebar to shrink to fit close icon */}
						</div>
					</Dialog>
				</Transition.Root>

				{/* Static sidebar for desktop */}
				<div className='hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0'>
					<div className='flex flex-col flex-grow border border-r-gray-600  border-gray-800 pt-5  overflow-y-auto gap-5'>
						<div className='flex items-center flex-shrink-0 px-4'>
							<div className='flex items-center justify-center'>
								<Link href='/' className='text-3xl'>
									Sabu Blog
								</Link>
							</div>
						</div>
						<div className='mt-5 flex-grow flex flex-col '>
							<nav className='flex-1 px-3 pb-4 space-y-1 '>
								{navigation.map((item) => {
									const current = isActive(item.href);

									return (
										<Link
											key={item.name}
											href={item.href}
											className={classNames(
												current
													? "bg-[#16a084]/20 backdrop-blur-md "
													: "text-white hover:bg-white/10 ",
												"group flex items-center px-2 py-2 text-base font-medium "
											)}>
											<item.icon
												className={classNames(
													current ? "" : " ",
													"mr-4 flex-shrink-0 h-6 w-6"
												)}
												aria-hidden='true'
											/>
											{item.name}
										</Link>
									);
								})}
							</nav>
						</div>
					</div>
				</div>
				{/* Search Desktop */}
				<div className='md:pl-64 flex flex-col flex-1'>
					<div className='sticky top-0 z-10 flex-shrink-0 flex h-16  shadow'>
						<button
							type='button'
							className='px-4 text-gray-200 focus:text-gray-50  md:hidden'
							onClick={() => setSidebarOpen(true)}>
							<span className='sr-only'>Open sidebar</span>
							<MenuIcon className='h-6 w-6' aria-hidden='true' />
						</button>
						<div className='flex-1 px-4 flex justify-between bg-black/10 backdrop-blur-2xl border-b border-gray-500'>
							<div className='flex-1 flex'>
								<form
									className='w-full flex md:ml-0 '
									// TODO: acton for search posts by name or title
									action='#'
									onSubmit={handleSubmit}>
									<label htmlFor='search-field' className='sr-only'>
										Search
									</label>
									<div className='relative w-full text-gray-100 focus-within:text-gray-50'>
										<div className='absolute inset-y-0 left-0 flex items-center pointer-events-none'>
											<MagnifyingGlassIcon
												className='h-5 w-5'
												aria-hidden='true'
											/>
										</div>
										<input
											id='search-field'
											className='block w-full h-full pl-8 pr-3 py-2 border-transparent  placeholder-gray-300 focus:outline-none focus:placeholder-gray-50 focus:ring-0 focus:border-transparent sm:text-sm'
											placeholder='Search'
											type='search'
											name='search'
											onChange={handleChangeInputForm}
										/>
									</div>
								</form>
							</div>

							{/* Profile dropdown */}
							<div className='ml-4 flex items-center md:ml-6'>
								<Menu as='div' className='ml-3 relative'>
									<div>
										<MenuButton
											as='button'
											className='max-w-xs  flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
											<span className='sr-only'>Open user menu</span>
											<Image
												className='rounded-full'
												width={50}
												height={50}
												src={`https://robohash.org/${session?.user?.name}`}
												alt=''
											/>
										</MenuButton>
									</div>
									<Transition
										as={Fragment}
										enter='transition ease-out duration-100'
										enterFrom='transform opacity-0 scale-95'
										enterTo='transform opacity-100 scale-100'
										leave='transition ease-in duration-75'
										leaveFrom='transform opacity-100 scale-100'
										leaveTo='transform opacity-0 scale-95'>
										<MenuItems
											as='div'
											className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg p-5 bg-[#16a084]/20 backdrop-blur-md border border-white/20'>
											{userNavigation.map((item) => (
												<MenuItems key={item.name} as='div'>
													{({ active }) => (
														<a
															href={item.href}
															className={classNames(
																active ? "bg-gray-100 text-black" : "",
																"block px-4 py-2 text-sm hover:bg-neutral-100/20 w-full p-2 rounded-lg"
															)}>
															{item.name}
														</a>
													)}
												</MenuItems>
											))}
										</MenuItems>
									</Transition>
								</Menu>
							</div>
						</div>
					</div>

					<main className='flex-1 py-6 w-4/5 mx-auto px-4 sm:px-6 md:px-8'>
							{children}
					</main>
				</div>
			</div>
		</>
	);
};
