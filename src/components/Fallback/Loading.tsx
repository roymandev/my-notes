import { CgSpinner } from 'react-icons/cg';

const Loading = () => {
  return (
    <div className="grid flex-1 place-items-center bg-slate-800 p-4 text-slate-500">
      <CgSpinner className="h-20 w-20 animate-spin" />
    </div>
  );
};

export default Loading;
