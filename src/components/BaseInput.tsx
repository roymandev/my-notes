import { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

const BaseInput = ({
  className,
  ...rest
}: ComponentPropsWithoutRef<'input'>) => {
  return (
    <input
      className={twMerge(
        'h-9 rounded border border-slate-700 bg-slate-900/40 py-1 px-2 outline-none focus:border-slate-500',
        className,
      )}
      {...rest}
    />
  );
};

export default BaseInput;
