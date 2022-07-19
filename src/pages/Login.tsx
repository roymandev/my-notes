import BaseButton from '@/components/BaseButton';
import { useState } from 'react';
import { RiGoogleFill } from 'react-icons/ri';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const signInWithGoogle = async () => {
    setAuthing(true);
    setErrorMsg('');

    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        console.log(response.user.uid);
        navigate('/');
      })
      .catch((error) => {
        setErrorMsg((error as Error).message);
        setAuthing(false);
      });
  };

  return (
    <main className="fixed inset-0 overflow-y-auto bg-slate-900 py-20 px-4 text-slate-300">
      <h1 className="px-4 py-10 text-center text-6xl font-bold">My Notes</h1>

      <section className="mx-auto max-w-md space-y-4 rounded bg-slate-800 p-4 shadow">
        <h2 className="p-4 text-center text-2xl font-medium">Login</h2>

        <form className="flex flex-col gap-4">
          {errorMsg && <p className="text-rose-500/80">{errorMsg}</p>}

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
              onClick={signInWithGoogle}
            >
              Login with Google
            </BaseButton>
          )}
        </form>
      </section>
    </main>
  );
};

export default Login;
