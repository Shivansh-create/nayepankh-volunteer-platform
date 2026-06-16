import NextAuth from "next-auth"
import { authConfig } from "./auth.config"

// We use a separated auth.config.ts to configure NextAuth for Edge compatibility
// because Prisma doesn't run on the Edge runtime natively.
// Wait, actually NextAuth v5 middleware setup:
export default NextAuth(authConfig).auth

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
