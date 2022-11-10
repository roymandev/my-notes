import { CgSpinner } from 'react-icons/cg';

export interface LoadingProps {
  text?: string;
}

const Loading = ({ text }: LoadingProps) => {
  return (
    <div className="grid flex-1 place-items-center bg-slate-800 p-4 text-slate-500">
      <div className="flex justify-center">
        <img
          src="/My%20Notes.svg"
          alt="My Notes Logo"
          className="mx-auto h-20 w-20 shadow"
        />
        {text && (
          <p className="absolute mt-28 flex items-center gap-2 text-2xl">
            <CgSpinner className="animate-spin" /> {text}
          </p>
        )}
      </div>
    </div>
  );
};

export default Loading;
