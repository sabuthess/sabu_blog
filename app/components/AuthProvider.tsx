"use client";
import { SessionProvider, Session } from "next-auth/react";

export const AuthProvider = ({
	children,
	session,
}: {
	children: React.ReactNode;
	session?: Session | null;
}) => {
	return <SessionProvider refetchInterval={5 * 60} session={session}>{children}</SessionProvider>;
};
