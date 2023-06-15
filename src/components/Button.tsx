import twclsx from '@/utils/twclsx';
import { ComponentPropsWithoutRef } from 'react';

type Props = {
  children?: React.ReactNode;
  variant?: 'default' | 'primary';
  icon?: React.ReactNode;
} & ComponentPropsWithoutRef<'button'>;

const Button = ({
  children,
  className,
  variant = 'default',
  icon,
  ...rest
}: Props) => {
  return (
    <button
      className={twclsx(
        'flex h-12 items-center justify-center gap-3 rounded-xl text-base outline-none transition-[colors_shadow] focus-visible:shadow-[0_0_0_4px_#84DCF53D]',
        variant === 'default' &&
          'bg-nobleBlack-600 text-nobleBlack-300 hover:bg-nobleBlack-500 hover:text-nobleBlack-200 active:bg-nobleBlack-400 active:text-nobleBlack-100',
        variant === 'primary' &&
          'bg-stemGreen-500 text-dayBlue-900 hover:bg-stemGreen-400 active:bg-stemGreen-300',
        className,
      )}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;
