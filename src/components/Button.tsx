import twclsx from '@/utils/twclsx';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

type Props = {
  children?: React.ReactNode;
  variant?: 'default' | 'subtle' | 'primary';
  size?: 'large' | 'medium' | 'small';
  icon?: React.ReactNode;
} & ComponentPropsWithoutRef<'button'>;

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      children,
      className,
      variant = 'default',
      size = 'medium',
      icon,
      ...rest
    }: Props,
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={twclsx(
          'flex items-center justify-center gap-3 rounded-xl outline-none transition-[colors_shadow] focus-visible:shadow-[0_0_0_4px_#84DCF53D]',
          variant === 'default' &&
            'bg-nobleBlack-600 text-nobleBlack-300 hover:bg-nobleBlack-500 hover:text-nobleBlack-200 active:bg-nobleBlack-400 active:text-nobleBlack-100',
          variant === 'subtle' &&
            'text-nobleBlack-400 hover:text-nobleBlack-300 active:text-nobleBlack-200',
          variant === 'primary' &&
            'bg-stemGreen-500 text-dayBlue-900 hover:bg-stemGreen-400 active:bg-stemGreen-300',
          size === 'large' && 'px-6 py-3 text-base',
          size === 'medium' && 'px-4 py-[10px] text-sm',
          size === 'small' && 'px-3 py-[7px] text-xs',
          className,
        )}
        {...rest}
      >
        {icon}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
