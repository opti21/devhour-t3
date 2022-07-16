import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  title: string;
  youtubeLink: string;
  description: string;
  image: string;
};

const SignInButton: React.FC<{ session: Session | null; returnTo: string }> = ({
  session,
  returnTo,
}) => {
  return (
    <>
      {!session ? (
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:cursor-pointer"
          onClick={() => signIn("github", { callbackUrl: returnTo })}
        >
          Sign In
        </button>
      ) : (
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:cursor-pointer"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      )}
    </>
  );
};

export default SignInButton;
