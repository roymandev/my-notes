import twclsx from '@/utils/twclsx';
import clsx from 'clsx';

type Props = {
  classNames?: { input?: string };
  icon?: React.ReactNode;
} & React.ComponentPropsWithoutRef<'input'>;

const Input = ({ classNames, icon, ...rest }: Props) => {
  return (
    <div
      className={clsx(
        'relative rounded-lg flex items-center',
        'after:absolute after:inset-0 after:z-[-1] after:contents',
      )}
    >
      {icon && (
        <span className="pointer-events-none absolute flex w-[52px]">
          {icon}
        </span>
      )}
      <input
        type="text"
        {...rest}
        data-with-icon={icon !== undefined}
        className={twclsx(
          'peer h-12 w-full rounded-lg bg-nobleBlack-600 px-4 text-base font-medium text-nobleBlack-200 outline-none',
          'transition-shadow placeholder:text-nobleBlack-300 focus-visible:shadow-[0_0_0_4px_#84DCF53D]',
          'data-[with-icon=true]:pl-[52px]',
          classNames?.input,
        )}
      />
      <div className="pointer-events-none absolute inset-0 rounded-lg border border-nobleBlack-500 transition-colors peer-focus-visible:border-transparent peer-focus-visible:bg-[linear-gradient(45deg,#82DBF7_0%,#B6F09C_100%)] peer-focus-visible:[-webkit-mask-composite:xor] peer-focus-visible:[-webkit-mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)] peer-focus-visible:[mask-composite:exclude]" />
    </div>
  );
};

export default Input;
