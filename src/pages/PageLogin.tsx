import BaseButton from '@/components/BaseButton';
import { login } from '@/libs/firebase';
import { atomUser } from '@/stores/userStore';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { RiGoogleFill } from 'react-icons/ri';
import { Navigate } from 'react-router-dom';

const PageLogin = () => {
  const user = useAtomValue(atomUser);
  const [authing, setAuthing] = useState(false);
  const [isError, setIsError] = useState(false);

  const loginHandler = () => {
    setAuthing(true);

    login().catch((error) => {
      setAuthing(false);
      console.log(error.message);
      setIsError(true);
    });
  };

  if (user) return <Navigate to="/" replace />;

  return (
    <main className="fixed inset-0 overflow-y-auto bg-slate-900 py-20 px-4 text-slate-300">
      <div className="flex items-center justify-center gap-4 py-10">
        <img src="/My%20Notes.svg" alt="Logo" className="h-16 w-16 shadow" />
        <h1 className="text-5xl font-bold">My Notes</h1>
      </div>

      <section className="mx-auto max-w-md space-y-4 rounded bg-slate-800 p-4 shadow">
        <h2 className="p-4 text-center text-2xl font-medium">Login</h2>

        <form className="flex flex-col gap-4">
          {isError && (
            <p className="text-rose-500/80">Failed, try again later.</p>
          )}

          {authing ? (
            <div className="flex items-center justify-center gap-4 p-4">
              <RiGoogleFill className="h-5 w-5 animate-bounce" />
              <p>Authenticating...</p>
            </div>
          ) : (
            <BaseButton
              type="submit"
              variant="primary"
              className="p-2 text-lg"
              disabled={authing}
              onClick={loginHandler}
            >
              Login with Google
            </BaseButton>
          )}
        </form>
      </section>
    </main>
  );
};

export default PageLogin;
