"use client";

import { CldUploadButton, type CldUploadButtonProps } from "next-cloudinary";

export const UploadButton = (props: CldUploadButtonProps) => {
	return <CldUploadButton {...props} />;
};
