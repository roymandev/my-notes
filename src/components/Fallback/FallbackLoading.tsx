import { CgSpinner } from 'react-icons/cg';
import { twMerge } from 'tailwind-merge';

export interface LoadingProps {
  className?: string;
}

const FallbackLoading = ({ className }: LoadingProps) => {
  return (
    <div
      className={twMerge(
        'flex items-center justify-center bg-slate-800 p-4 text-slate-500',
        className,
      )}
    >
      <CgSpinner className="h-20 w-20 animate-spin" />
    </div>
  );
};

export default FallbackLoading;
