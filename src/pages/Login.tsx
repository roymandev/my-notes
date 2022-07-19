import BaseButton from '@/components/BaseButton';
import BaseInput from '@/components/BaseInput';

const Login = () => {
  return (
    <main className="fixed inset-0 overflow-y-auto bg-slate-900 py-20 px-4 text-slate-300">
      <h1 className="px-4 py-10 text-center text-6xl font-bold">My Notes</h1>
      <section className="mx-auto max-w-md rounded bg-slate-800 p-4 shadow">
        <h2 className="p-4 text-center text-2xl font-medium">Login</h2>
        <form className="flex flex-col gap-4">
          <fieldset className="flex flex-col gap-1">
            <label htmlFor="email" className="text-lg font-medium">
              Email
            </label>
            <BaseInput type="email" id="email" name="email" />
          </fieldset>

          <fieldset className="flex flex-col gap-1">
            <label htmlFor="password" className="text-lg font-medium">
              Password
            </label>
            <BaseInput type="password" id="password" name="password" />
          </fieldset>

          <BaseButton type="submit" variant="primary" className="p-2 text-lg">
            Login
          </BaseButton>
        </form>
      </section>
    </main>
  );
};

export default Login;
