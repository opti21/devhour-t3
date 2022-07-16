import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import AddEpisodeForm from "../components/AddEpisodeForm";
import SignInButton from "../components/SignInButton";
import { trpc } from "../utils/trpc";

const Admin: NextPage = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>Admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-screen min-h-screen bg-indigo-900">
        <div className="container mx-auto min-h-screen p-4 overflow-y-auto">
          <h1 className="text-2xl mb-6 text-white">Admin</h1>
          <SignInButton session={session} returnTo="/admin" />
          <AddEpisodeForm session={session} />
        </div>
      </div>
    </>
  );
};

export default Admin;
