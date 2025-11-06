"use client";
import { redirect } from "next/navigation";
import { Header } from "@/app/components/Header";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function CreatePostPage() {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [image, setImage] = useState();
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [preview, setPreview] = useState();
	const [loading, setLoadin] = useState(false);
	const { data: session } = useSession();

	if (!session) {
		redirect("/login");
	}

	const handleFileClick = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = (event: React.FormEvent) => {
		setImage(event.target.files[0]);
	};

	useEffect(() => {
		if (!image) {
			return;
		}

		const objectUrl = URL.createObjectURL(image);
		setPreview(objectUrl);

		return () => URL.revokeObjectURL(objectUrl);
	}, [image]);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		setLoadin(true);
		try {
			const res = await axios.post("/api/post", {
				body: {
					title,
					content,
					image: preview,
					authorId: session?.user?.id,
				},
			});
			setTitle("");
			setContent("");
			console.log(res.data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoadin(false);
		}
	};

	return (
		<>
			<Header />
			<main className='w-3/5 mx-auto my-30 flex relative z-10'>
				<div className='p-10 w-full flex flex-col gap-10 shadow-lg border border-white/20'>
					<h1 className='text-4xl'>Create your next post</h1>
					<form
						onSubmit={handleSubmit}
						className='border border-white w-full p-10 flex flex-col gap-4'>
						<div>
							<input
								type='file'
								id='image_cover'
								name='image_cover'
								ref={fileInputRef}
								style={{ display: "none" }}
								onChange={handleFileChange}
							/>

							<button
								type='button'
								onClick={handleFileClick}
								className='bg-[#16a084]/20 p-2 border border-white/20 cursor-pointer'>
								{}
								{image ? <p>Update a cover image</p> : <p>Add a cover image</p>}
							</button>
						</div>
						<div
							style={{ position: "relative", width: "100%", height: "100%" }}>
							{image && preview && (
								<Image
									src={preview}
									alt='Uploaded preview'
									fill
									style={{ objectFit: "cover" }} // o 'cover' si quieres que se recorte
								/>
							)}
						</div>

						<input
							type='text'
							id='title'
							name='title'
							className='py-2 px-4 bg-white/10 border border-white w-full outline-none'
							placeholder='New post title here!'
							required
							onChange={(e) => setTitle(e.target.value)}
						/>

						<textarea
							id='content'
							name='content'
							className='py-2 px-4 h-[400px] border bg-white/10 w-full border-white outline-none overflow-auto overflow-y-auto'
							placeholder='Write your post content here'
							required
							onChange={(e) => setContent(e.target.value)}
						/>
						{loading ? (
							<div className="self-end animate animate-spin">
								<div className=' w-12 h-12 border-4 border-white border-t-teal-500  rounded-full '></div>
							</div>
						) : (
							<button
								className='self-end text-white border border-teal-400 p-2 w-[100px] hover:bg-teal-400/20 transition'
								type='submit'>
								Upload
							</button>
						)}

						{/* <BtnCreatePost/> */}
					</form>
				</div>
			</main>
		</>
	);
}
