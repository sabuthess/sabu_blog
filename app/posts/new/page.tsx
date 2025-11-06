"use client";
import { redirect } from "next/navigation";
import { Header } from "@/app/components/Header";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import axios, { toFormData } from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { createPost } from "@/actions/createPost";

function CreatePostPage() {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [imageFile, setImageFile] = useState<File | string>();
	const [preview, setPreview] = useState();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { data: session } = useSession();

	if (!session) redirect("/login");

	const handleFileClick = () => fileInputRef.current?.click();

	const handleFileChange = (event) => {
		setImageFile(event.target.files[0]);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsSubmitting(true);

		try {
			const formData = new FormData(event.currentTarget);
			const title = formData.get("title")?.toString().trim();
			const content = formData.get("content")?.toString().trim();
			let imageUrl: string | undefined;

			if (imageFile) {
				toast.info("Subiendo imagen...");

				const uploadFormData = new FormData();
				uploadFormData.append("file", imageFile);

				const uploadResponse = await fetch("/api/upload", {
					method: "POST",
					body: uploadFormData,
				});

				if (!uploadResponse.ok) {
					throw new Error("Error al subir la imagen");
				}

				const uploadResult = await uploadResponse.json();
				imageUrl = uploadResult.url;
				toast.success("Imagen subida exitosamente");
			}
			console.log("Creando post con:", { title, content, imageUrl }); // Debug

			await createPost({
				title,
				content,
				imageUrl,
			});
			toast.success("¡Post creado exitosamente!");
		} catch (error) {
			console.error("Error:", error);
			toast.error(
				error instanceof Error ? error.message : "Error al crear el post"
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	useEffect(() => {
		if (!imageFile) {
			return;
		}

		const objectUrl = URL.createObjectURL(imageFile);
		setPreview(objectUrl);

		return () => URL.revokeObjectURL(objectUrl);
	}, [imageFile]);

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
								{imageFile ? (
									<p>Update a cover image</p>
								) : (
									<p>Add a cover image</p>
								)}
							</button>
						</div>
						<div
							style={{ position: "relative", width: "100%", height: "100%" }}>
							{imageFile && preview && (
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
						/>

						<textarea
							id='content'
							name='content'
							className='py-2 px-4 h-[400px] border bg-white/10 w-full border-white outline-none overflow-auto overflow-y-auto'
							placeholder='Write your post content here'
							required
						/>
						{isSubmitting ? (
							<div className='self-end animate animate-spin'>
								<div className=' w-12 h-12 border-4 border-white border-t-teal-500  rounded-full '></div>
							</div>
						) : (
							<button
								className='self-end text-white border border-teal-400 p-2 w-[100px] hover:bg-teal-400/20 transition'
								type='submit'>
								Upload
							</button>
						)}
					</form>
				</div>
			</main>
		</>
	);
}

export default CreatePostPage;
