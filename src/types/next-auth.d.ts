import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */
  interface Session {
    user: {
      /** The user's role. */
      id: string;
      name: string;
      email: string;
      image: string;
      role: string;
    };
  }
}
