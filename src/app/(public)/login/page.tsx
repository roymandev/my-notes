import IconGoogle from '~/icon/IconGoogle.svg';
import Link from 'next/link';
import Background from './Background';
import Form from './Form';
import Separator from '@/components/Separator';
import Button from '@/components/Button';

const LoginPage = () => {
  return (
    <main className="fixed inset-0 flex">
      <div className="flex flex-1 flex-col overflow-y-auto px-6 py-10 sm:p-12 md:max-w-xl">
        <h1 className="text-3xl font-extrabold text-green-blue-500">
          My Notes
        </h1>

        <div className="mx-auto mt-28 w-full max-w-lg">
          <div className="text-4xl">
            Note-Taking Made
            <br />
            <span className="font-bold text-dayblue-blue-green-500">Easy!</span>
          </div>
          <p className="mt-6 font-medium text-nobleBlack-300">
            Experience the simplicity of My Notes for effortless note-taking.
          </p>

          <Button
            className="mt-16 w-full text-nobleBlack-400"
            icon={<IconGoogle />}
          >
            Sign in with Google
          </Button>

          <Separator className="my-12">or continue with email</Separator>

          <Form />

          <p className="mt-12 text-center font-semibold text-nobleBlack-400">
            Don&apos;t have an account?
            <Link href="/signup" className="ml-2 text-blue-green-500">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden rounded-l-3xl max-md:hidden">
        <Background />
      </div>
    </main>
  );
};

export default LoginPage;
