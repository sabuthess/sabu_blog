// app/create-post/CreatePostClient.tsx
"use client";

import Form from "next/form";
import { Header } from "@/app/components/Header";
import { useRef, useState } from "react";
import { createPost } from "@/actions/createPost";

export default function CreatePostClient() {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [fileName, setFileName] = useState("Ningún archivo seleccionado");

	const handleFileClick = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		setFileName(file ? file.name : "Ningún archivo seleccionado");
	};

	return (
		<>
			<Header />
			<main className='w-3/5 mx-auto my-30 flex relative z-10'>
				<div className='p-10 w-full flex flex-col gap-10 shadow-lg border border-white/20'>
					<h1 className='text-4xl'>Create your next post</h1>
					<Form
						action={createPost}
						className='border border-white w-full p-10 flex flex-col gap-4'>
						<div>
							<input
								type='file'
								ref={fileInputRef}
								onChange={handleFileChange}
								style={{ display: "none" }}
							/>

							<button
								type='button'
								onClick={handleFileClick}
								className='bg-[#16a084]/20 p-2 border border-white/20 cursor-pointer'>
								Add a cover image
							</button>
						</div>

						<input
							type='text'
							id='title'
							name='title'
							className='py-2 px-4 bg-white/10 border border-white w-full outline-none'
							placeholder='New post title here!'
							required
						/>

						<textarea
							id='content'
							name='content'
							className='py-2 px-4 h-[400px] border bg-white/10 w-full border-white outline-none overflow-auto overflow-y-auto'
							placeholder='Write your post content here'
							required
						/>

						<button
							className='self-end text-white border border-teal-400 p-2 w-[100px] hover:bg-teal-400/20 transition'
							type='submit'>
							Upload
						</button>
					</Form>
				</div>
			</main>
		</>
	);
}
