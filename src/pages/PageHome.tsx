import { Link } from 'react-router-dom';

const PageHome = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-between gap-4 overflow-y-auto bg-slate-900 text-slate-300">
    <header className="flex w-full max-w-5xl items-center px-4 py-5">
      <Link
        to="/"
        className="flex items-center gap-4 text-2xl font-bold md:text-3xl"
      >
        <img
          src="/My%20Notes.svg"
          alt="Logo"
          className="ml-1 h-10 w-10 shadow md:h-14 md:w-14"
        />
        <h1>My Notes</h1>
      </Link>

      <Link
        to="/note"
        className="ml-auto rounded bg-slate-700 px-3 py-1 text-lg font-medium shadow hover:bg-slate-600 hover:text-white md:py-2 md:px-5 md:text-xl"
      >
        Open App
      </Link>
    </header>
    <main className="max-w-5xl px-4">
      <p className="mb-8 text-center text-2xl md:text-3xl">
        Just a reguler notes app.
      </p>
      <img
        src="https://ik.imagekit.io/roymandev/Firefox_Screenshot_2022-08-29T20-00-35.385Z_astnavNLA.png?ik-sdk-version=javascript-1.4.3&updatedAt=1661808297336"
        alt="Note App Screenshot"
        className="rounded border border-dashed border-slate-700"
      />
    </main>

    <footer className="px-4 py-10 text-lg">
      Created by{' '}
      <a className="underline hover:text-white" href="https://royman.dev">
        Royman.dev
      </a>
    </footer>
  </div>
);

export default PageHome;
