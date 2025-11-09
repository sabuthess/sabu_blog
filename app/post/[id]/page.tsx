import { Header } from "@/app/components/Header";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";
import { Image as ImageNotFound} from "lucide-react";

async function Post({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const post = await prisma.post.findUnique({
		where: { id: parseInt(id) },
		include: {
			author: true,
		},
	});

	if (!post) return notFound();

	console.log(post);

	return (
		<>
			<Header />
			<main className='w-[50%] mx-auto mt-30 '>
				<h1 className='self-start text-4xl font-bold mb-8 '>{post.title}</h1>
				<Link href={`/user/${post.authorId}`}>by {post?.author?.name}</Link>
				<div className='relative w-full h-[200px] '>
					{post.imageUrl ?
					
					<Image
						src={`${post.imageUrl }`}
						alt='Uploaded preview'
						fill
						style={{ objectFit: "cover" }}
					/>
					: 
					<div className="flex flex-col items-center justify-center">
					<ImageNotFound size={200} />
					<span>Image not found</span>
					</div>
					}
				</div>
				<article className='w-full flex flex-col items-center justify-center mx-auto space-y-10'>
					<p className=' text-center  text-3xl'></p>
					<div className='prose prose-amber max-w-none'>
						<div className='markdown-content'>
							<ReactMarkdown
								remarkPlugins={[remarkGfm]}
								components={{
									// Headings
									h1: ({ node, ...props }) => (
										<h1
											className='text-5xl font-extrabold mb-6 mt-12 text-gray-100'
											{...props}
										/>
									),
									h2: ({ node, ...props }) => (
										<h2
											className='text-4xl font-bold mb-5 mt-10 text-gray-100 '
											{...props}
										/>
									),
									h3: ({ node, ...props }) => (
										<h3
											className='text-3xl font-semibold mb-4 mt-8 text-gray-200'
											{...props}
										/>
									),
									h4: ({ node, ...props }) => (
										<h4
											className='text-2xl font-semibold mb-3 mt-6 text-gray-200'
											{...props}
										/>
									),
									h5: ({ node, ...props }) => (
										<h5
											className='text-xl font-semibold mb-2 mt-5 text-gray-300'
											{...props}
										/>
									),
									h6: ({ node, ...props }) => (
										<h6
											className='text-lg font-semibold mb-2 mt-4 text-gray-300'
											{...props}
										/>
									),

									// Paragraph
									p: ({ node, ...props }) => (
										<p
											className='mb-5 text-gray-100 leading-relaxed text-lg'
											{...props}
										/>
									),

									// Links
									a: ({ node, href, children, ...props }) => {
										const isExternal =
											href &&
											(href.startsWith("http://") ||
												href.startsWith("https://"));
										return (
											<a
												href={href}
												className='text-teal-600  hover:text-teal-800 underline decoration-2 underline-offset-2 transition-colors font-medium'
												target={isExternal ? "_blank" : undefined}
												rel={isExternal ? "noopener noreferrer" : undefined}
												{...props}>
												{children}
											</a>
										);
									},

									// Lists
									ul: ({ node, ...props }) => (
										<ul
											className='list-disc list-outside ml-6 mb-5 space-y-2'
											{...props}
										/>
									),
									ol: ({ node, ...props }) => (
										<ol
											className='list-decimal list-outside ml-6 mb-5 space-y-2'
											{...props}
										/>
									),
									li: ({ node, ...props }) => (
										<li className='text-gray-100 text-lg pl-2' {...props} />
									),

									// Blockquotes
									blockquote: ({ node, ...props }) => (
										<blockquote
											className='border-l-4 border-teal-500 pl-6 py-2 my-6 italic bg-black rounded-r-lg'
											{...props}
										/>
									),

									// Horizontal Rule
									hr: ({ node, ...props }) => (
										<hr
											className='my-8 border-t-2 border-neutral-800'
											{...props}
										/>
									),

									// Emphasis
									strong: ({ node, ...props }) => (
										<strong
											className='font-bold text-white '
											{...props}
										/>
									),
									em: ({ node, ...props }) => (
										<em className='italic text-gray-400' {...props} />
									),
									del: ({ node, ...props }) => (
										<del className='line-through text-gray-100' {...props} />
									),

									// Code blocks
									code: ({ node, inline, className, children, ...props }) => {
										const match = /language-(\w+)/.exec(className || "");
										const language = match ? match[1] : "";

										if (!inline && language) {
											return (
												<div className='relative mb-6 rounded-xl overflow-hidden shadow-lg'>
													<div
														className='absolute inset-0 pointer-events-none'
														style={{
															backgroundImage:
																"linear-gradient(to right, #4f4f4f2e 1px, transparent 1px), linear-gradient(to bottom, #8080800a 1px, transparent 1px)",
															backgroundSize: "14px 24px",
														}}
													/>

													<div className='relative backdrop-blur-md bg-gray-900/95 border border-white/10'>
														<div className='bg-gray-800 px-4 py-2 text-sm text-gray-300 font-mono border-b border-gray-500'>
															{language}
														</div>
														<SyntaxHighlighter
															style={vscDarkPlus}
															language={language}
															PreTag='div'
															customStyle={{
																margin: 0,
																background: "transparent",
																padding: "1.5rem",
																fontSize: "0.95rem",
															}}
															{...props}>
															{String(children).replace(/\n$/, "")}
														</SyntaxHighlighter>
													</div>
												</div>
											);
										}

										if (!inline) {
											return (
												<div className='relative mb-6 rounded-xl overflow-hidden shadow-lg'>
													<div
														className='absolute inset-0 pointer-events-none'
														style={{
															backgroundImage:
																"linear-gradient(to right, #4f4f4f2e 1px, transparent 1px), linear-gradient(to bottom, #8080800a 1px, transparent 1px)",
															backgroundSize: "14px 24px",
														}}
													/>
													<div className='relative backdrop-blur-md bg-gray-900/95 border border-white/10'>
														<pre className='p-6 overflow-x-auto'>
															<code
																className='text-gray-100 font-mono text-sm'
																{...props}>
																{children}
															</code>
														</pre>
													</div>
												</div>
											);
										}

										return (
											<code
												className='bg-gray-100 px-2 py-1 rounded text-sm font-mono text-red-600 border border-gray-200'
												{...props}>
												{children}
											</code>
										);
									},

									table: ({ node, ...props }) => (
										<div className='relative overflow-x-auto my-6 rounded-lg'>
											<div
											/>
											<div className='relative backdrop-blur-md   border-white/80 rounded-md'>
												<table
													className='min-w-full divide-y divide-gray-300'
													{...props}
												/>
											</div>
										</div>
									),
									thead: ({ node, ...props }) => (
										<thead
											className='bg-[#16a084]/80 backdrop-blur-sm'
											{...props}
										/>
									),
									tbody: ({ node, ...props }) => (
										<tbody className='divide-y divide-neutral-300' {...props} />
									),
									tr: ({ node, ...props }) => (
										<tr
											className='hover:bg-white/10 transition-colors'
											{...props}
										/>
									),
									th: ({ node, ...props }) => (
										<th
											className='px-6 py-3 text-left text-sm font-bold hover:bg-none text-white uppercase tracking-wider'
											{...props}
										/>
									),
									td: ({ node, ...props }) => (
										<td
											className='text-start px-6 py-4 text-sm text-gray-100'
											{...props}
										/>
									),

									// Images
									img: ({ node, src, alt, ...props }) => (
										<img
											src={src}
											alt={alt}
											className='rounded-lg shadow-lg my-6 w-[400px] h-auto '
											{...props}
										/>
									),
								}}>
								{post.content}
							</ReactMarkdown>
						</div>
					</div>
				</article>
			</main>
		</>
	);
}

export default Post;
