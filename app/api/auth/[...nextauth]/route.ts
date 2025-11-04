import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import NextAuth, { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: "jwt",
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
			allowDangerousEmailAccountLinking: true,
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID ?? "",
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? "",
			allowDangerousEmailAccountLinking: true,
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID ?? "",
			clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
			allowDangerousEmailAccountLinking: true,
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
			}
			return session;
		},
		async signIn({ user, account, profile }) {
			if (!user.email) return false;

			const existingUser = await prisma.user.findUnique({
				where: { email: user.email },
				include: { profile: true, accounts: true },
			});

			if (existingUser) {
				const accountExists = existingUser.accounts.some(
					(acc) => acc.provider === account?.provider
				);

				if (!accountExists && account) {
					await prisma.account.create({
						data: {
							userId: existingUser.id,
							type: account.type,
							provider: account.provider,
							providerAccountId: account.providerAccountId,
							access_token: account.access_token,
							token_type: account.token_type,
							scope: account.scope,
							id_token: account.id_token,
						},
					});
				}

				if (!existingUser.profile) {
					await prisma.profile.create({
						data: {
							userId: existingUser.id,
							firstName: (profile )?.given_name || "",
							lastName: (profile as any)?.family_name || "",
						},
					});
				}
			} else {
				await prisma.user.create({
					data: {
						email: user.email,
						name: user.name,
						profile: {
							create: {
								firstName: (profile as any)?.given_name || "",
								lastName: (profile as any)?.family_name || "",
							},
						},
					},
				});
			}

			return true;
		},
	},
	pages: {
		signIn: "/login",
		error: "/auth/error",
	},
	secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
